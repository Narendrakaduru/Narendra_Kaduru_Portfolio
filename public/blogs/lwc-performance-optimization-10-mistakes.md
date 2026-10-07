# LWC Performance Optimization: 10 Mistakes Developers Should Avoid ⚡🚀
---

Lightning Web Components (LWC) is one of the most powerful modern UI frameworks in the Salesforce ecosystem. However, writing an LWC that works in a developer sandbox is very different from writing an LWC that performs smoothly in an enterprise production environment.

A component may run smoothly when tested with 20 sample records, but the same component can quickly crawl to a halt when real users work with thousands of records, complex Apex logic, and high-frequency UI interactions.

In this guide, we break down **10 common LWC performance mistakes** and provide actionable best practices to build fast, scalable, and production-ready components.

👉 **Key Takeaway:** LWC performance is not just about frontend JavaScript. It depends on the complete execution chain:

**LWC UI → Apex Controller → SOQL Query → Salesforce Database → Client-Side DOM Rendering**

---

### 🎯 Why LWC Performance Matters

Performance directly affects user adoption and productivity. A poorly optimized component leads to:

- ❌ Slow initial page loads and tab switches
- ❌ Redundant roundtrips to the Salesforce server
- ❌ Hitting Salesforce governor limits (SOQL / CPU limits)
- ❌ High memory usage and frozen browser threads
- ❌ Excessive DOM repainting and reflows
- ❌ Sluggish performance on mobile devices (Salesforce Mobile App)

The goal is not to write overly complicated code, but to keep your components **simple, efficient, and scalable**.

---

### 1. Calling Apex Too Many Times 🔄

One of the most common performance anti-patterns is making multiple independent Apex calls when initializing a component.

For instance, an LWC might fetch Accounts, then fire another Apex request for Contacts, another for Opportunities, and yet another for Cases. Every roundtrip adds HTTP overhead, authentication handling, and server queueing.

#### ❌ Problematic Approach: Multiple Roundtrips

```javascript
connectedCallback() {
    this.loadAccounts();
    this.loadContacts();
    this.loadOpportunities();
    this.loadCases();
}

loadAccounts() {
    getAccounts().then(result => {
        this.accounts = result;
    });
}

loadContacts() {
    getContacts().then(result => {
        this.contacts = result;
    });
}

loadOpportunities() {
    getOpportunities().then(result => {
        this.opportunities = result;
    });
}
```

#### ✅ Better Approach: Combine Requests

Consolidate related data retrieval into a single Apex method using an Apex **wrapper class** or composite response object:

```apex
public with sharing class DashboardController {
    public class DashboardData {
        @AuraEnabled public List<Account> accounts { get; set; }
        @AuraEnabled public List<Contact> contacts { get; set; }
        @AuraEnabled public List<Opportunity> opportunities { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static DashboardData getDashboardData() {
        DashboardData data = new DashboardData();
        data.accounts = [SELECT Id, Name FROM Account LIMIT 20];
        data.contacts = [SELECT Id, Name, Email FROM Contact LIMIT 20];
        data.opportunities = [SELECT Id, Name, StageName FROM Opportunity LIMIT 20];
        return data;
    }
}
```

This reduces multiple HTTP roundtrips down to a **single network request**.

---

### 2. Not Using Cacheable Apex Methods ⚡

If an Apex method only retrieves data and does not perform any DML or record mutations, you should always mark it as **cacheable**.

Marking an Apex method with `@AuraEnabled(cacheable=true)` enables client-side caching via the Lightning Data Service (LDS) cache.

```apex
@AuraEnabled(cacheable=true)
public static List<Account> getAccounts() {
    return [
        SELECT Id, Name, Industry
        FROM Account
        LIMIT 50
    ];
}
```

In your LWC JavaScript:

```javascript
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountList extends LightningElement {
    @wire(getAccounts)
    accounts;
}
```

#### 📌 Benefits of Caching:
- ✅ Subsequent requests return data instantly from the local browser cache without hitting the Salesforce server.
- ✅ Wire service automatically handles cache updates and component re-renders.
- ⚠️ **Important:** Never use `cacheable=true` for methods performing DML or creating/updating records.

---

### 3. Querying More Data Than You Actually Need 📦

A common mistake in Apex controllers is querying unnecessary fields "just in case" they are needed later.

#### ❌ Avoid: Querying Unused Fields

```sql
SELECT Id, Name, Phone, Email, Website, Industry,
       AnnualRevenue, BillingStreet, BillingCity,
       BillingState, BillingPostalCode,
       Description, Owner.Name
FROM Account
```

If your UI only shows the Account name and phone number, querying all those extra fields increases JSON payload size, serialization time, and memory usage.

#### ✅ Better: Query Only What Is Displayed

```sql
SELECT Id, Name, Phone
FROM Account
```

Filtering fields at the SOQL level minimizes the byte transfer over the network and speeds up serialization between Apex and JavaScript.

---

### 4. Loading Too Many Records at Once 📄

Loading 10,000+ records in one go freezes the browser because the client has to allocate memory, parse the JSON payload, and instantiate thousands of JavaScript proxies.

#### ✅ Solution: Implement Pagination or Infinite Scrolling

Fetch a manageable batch of records at a time:

```sql
SELECT Id, Name, Phone
FROM Account
ORDER BY Name ASC
LIMIT 50
```

Use pagination techniques for:
- `lightning-datatable`
- Search result lists
- Customer transaction history
- Case management consoles

---

### 5. Rendering Huge Lists in the DOM 🖥️

Even when Apex responds quickly, injecting thousands of DOM elements into the browser will severely degrade performance and cause scroll lag.

#### ❌ Avoid: Massive Unconstrained DOM Elements

```html
<template for:each={accounts} for:item="account">
    <div key={account.Id}>
        {account.Name}
    </div>
</template>
```

#### ✅ Better Approach:
- Use pagination controls to show 25 to 50 items per page.
- Use virtual scrolling techniques so only visible elements are mounted in the DOM.
- Display summaries or cards with lazy-loading drill-down views.

---

### 6. Using Getters for Heavy Calculations ⚙️

Getters in LWC are re-evaluated frequently whenever component reactivity triggers. Putting heavy iterations, regex operations, or sorting logic inside a getter causes repeated calculations.

#### ❌ Problematic Getter

```javascript
get processedAccounts() {
    return this.accounts.map(account => {
        // Expensive filtering, calculation, or string transformation
        return {
            ...account,
            formattedRevenue: new Intl.NumberFormat().format(account.AnnualRevenue)
        };
    });
}
```

#### ✅ Better: Compute Once When Data Changes

Transform the data once when it arrives from Apex or wire:

```javascript
processAccounts() {
    this.processedAccounts = this.accounts.map(account => ({
        ...account,
        displayName: account.Name,
        formattedRevenue: new Intl.NumberFormat().format(account.AnnualRevenue)
    }));
}
```

---

### 7. Unnecessary Reactive Properties 🔄

In LWC, mutating reactive variables triggers the component lifecycle engine to assess whether re-rendering is needed. 

Modifying multiple properties sequentially can trigger unnecessary rendering cycles.

#### ✅ Best Practices for Clean Reactivity:
- Group related state changes together.
- For arrays and collections, use immutable assignment patterns:

```javascript
// Adding a new item cleanly
this.accounts = [...this.accounts, newAccount];
```

- Avoid deeply nested tracked state when simple flat objects will do.

---

### 8. Forgetting Lazy Loading ⏳

Not every tab, modal, or section of a page needs to load immediately on first mount.

Consider a dashboard containing:
1. Account Overview (Immediate)
2. Related Contacts (Secondary tab)
3. Opportunities Chart (Third tab)
4. Audit History (Accordion section)

Loading all four sections on `connectedCallback()` slows down the initial component render.

#### ✅ Better: Load On Demand
- Fetch Contact details only when the user switches to the Contacts tab.
- Render charts and heavy tables when their container becomes visible.
- Defer loading historical audit records until the user expands the accordion.

---

### 9. Performing SOQL or DML Inside Loops 🔁

While this is an Apex backend practice, it is the #1 cause of slow LWC responses and runtime governor limit exceptions (`System.LimitException: Too many SOQL queries: 101`).

#### ❌ Bad: SOQL Inside Loop

```apex
for (Account acc : accounts) {
    List<Contact> contacts = [
        SELECT Id, Name
        FROM Contact
        WHERE AccountId = :acc.Id
    ];
}
```

#### ✅ Better: Bulkified SOQL Query

```apex
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}

List<Contact> contacts = [
    SELECT Id, Name, AccountId
    FROM Contact
    WHERE AccountId IN :accountIds
];
```

Always bulkify Apex queries to ensure your LWC runs within predictable governor limits.

---

### 10. Ignoring the Browser and Network 🌐

Never guess where a bottleneck is coming from. A component might feel slow not because of Apex, but because of client-side DOM overhead or huge payloads.

#### 🛠️ Chrome DevTools Inspection Areas:
- **Network Tab:** Check API response times, payload transfer sizes, and waterfall latency.
- **Performance Tab:** Record interactions to spot long JavaScript tasks and layout thrashing.
- **Console Tab:** Monitor warnings, exceptions, and render cycles.
- **Memory Tab:** Detect memory leaks caused by uncleared event listeners or timeouts.

👉 **Rule of Thumb:** Always **measure first, then optimize**.

---

### ⭐ Bonus: Remove Unnecessary Console Logs 🧹

During local development, developers frequently leave debug logs across lifecycle hooks:

```javascript
console.log('Account data:', this.accounts);
console.log('Selected account:', this.selectedAccount);
console.log('Processed data:', this.processedData);
```

In production, excessive `console.log()` statements consume browser memory, slow down execution in loops, and can expose sensitive business data in the browser developer tools. Clean them up before releasing!

---

### ✅ LWC Performance Optimization Checklist

Before deploying your Lightning Web Component to production, review this checklist:

- [ ] Are read-only Apex methods marked `@AuraEnabled(cacheable=true)`?
- [ ] Are SOQL queries restricted to only the fields displayed in the UI?
- [ ] Is data paginated or bounded by a strict `LIMIT`?
- [ ] Are multiple Apex calls consolidated into single efficient requests?
- [ ] Are search inputs debounced before making server queries?
- [ ] Are expensive calculations kept out of template getters?
- [ ] Is secondary content lazy-loaded on user interaction?
- [ ] Is all Apex code bulkified without queries or DML inside loops?
- [ ] Have unnecessary `console.log` statements been removed?
- [ ] Have Network and Performance tabs been checked in Chrome DevTools?

---

### 🚀 Real-World Example: Optimizing an Account Search LWC

Let’s look at a practical before-and-after implementation of a real-time Account search component.

#### ❌ Example 1: Poorly Designed Implementation

```javascript
import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountSearch extends LightningElement {
    accounts = [];

    connectedCallback() {
        this.loadAccounts();
    }

    loadAccounts() {
        getAccounts()
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleSearch(event) {
        const searchKey = event.target.value;

        // ❌ BAD: Fires an Apex server call on EVERY keystroke!
        getAccounts({ searchKey: searchKey })
            .then(result => {
                this.accounts = result;
            });
    }
}
```

If a user types `"Salesforce"` (10 letters), this unoptimized code triggers **10 separate server requests** in rapid succession!

#### ❌ Problems in This Approach:
- Apex is called on every single key press.
- No minimum character threshold before searching.
- No debouncing mechanism.
- Server returns all fields without limits.
- High risk of race conditions where older requests overwrite newer ones.

---

#### ✅ Example 2: Optimized Apex Controller

```apex
public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchKey) {
        if (String.isBlank(searchKey) || searchKey.trim().length() < 2) {
            return new List<Account>();
        }

        String searchText = '%' + String.escapeSingleQuotes(searchKey.trim()) + '%';

        return [
            SELECT Id, Name, Industry, Phone
            FROM Account
            WHERE Name LIKE :searchText
            WITH SECURITY_ENFORCED
            ORDER BY Name ASC
            LIMIT 50
        ];
    }
}
```

#### 📌 Controller Optimizations:
- `with sharing` & `WITH SECURITY_ENFORCED` ensure proper Salesforce security.
- `@AuraEnabled(cacheable=true)` enables client-side caching.
- Restricts SOQL to only necessary fields (`Id`, `Name`, `Industry`, `Phone`).
- Clamps results with `LIMIT 50`.

---

#### ✅ Example 3: Optimized LWC Component with Debounce

```javascript
import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountSearch extends LightningElement {
    accounts = [];
    searchKey = '';
    searchTimeout;

    handleSearch(event) {
        this.searchKey = event.target.value;

        // Clear any pending timeout
        clearTimeout(this.searchTimeout);

        // Require at least 2 characters before searching
        if (this.searchKey.length < 2) {
            this.accounts = [];
            return;
        }

        // Wait 400ms after the user stops typing before calling Apex
        this.searchTimeout = setTimeout(() => {
            this.searchAccounts();
        }, 400);
    }

    searchAccounts() {
        getAccounts({ searchKey: this.searchKey })
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                console.error('Account search error:', error);
            });
    }
}
```

Now, typing `"Salesforce"` waits until the user pauses, resulting in **1 single server request** instead of 10!

---

#### 🧩 Example HTML Template

```html
<template>
    <lightning-card title="Account Search" icon-name="standard:account">
        <div class="slds-p-around_medium">
            <lightning-input
                type="search"
                label="Search Account"
                placeholder="Enter account name..."
                onchange={handleSearch}>
            </lightning-input>
        </div>

        <template if:true={accounts.length}>
            <div class="slds-p-horizontal_medium">
                <template for:each={accounts} for:item="account">
                    <div key={account.Id} class="slds-box slds-box_x-small slds-m-bottom_x-small">
                        <p class="slds-text-heading_small"><strong>{account.Name}</strong></p>
                        <p class="slds-text-body_small">Industry: {account.Industry} | Phone: {account.Phone}</p>
                    </div>
                </template>
            </div>
        </template>
    </lightning-card>
</template>
```

---

#### 📊 Summary: Before vs After Optimization

| Aspect | Before Optimization | After Optimization |
| --- | --- | --- |
| **Apex Calls** | Triggered on every key press | Debounced (waits 400ms after pause) |
| **Minimum Query Length** | None (fires even on 1 character) | Requires at least 2 characters |
| **Data Returned** | Entire object data / unbounded | Capped to 50 records |
| **SOQL Fields** | All fields retrieved | Only 4 displayed fields queried |
| **Apex Caching** | Standard uncached invocation | `@AuraEnabled(cacheable=true)` |
| **DOM Impact** | Potential layout jitter on every keystroke | Stable, debounced re-render |

---

### ⚠️ Pitfall: Never Test Only with Small Datasets

A developer might write:

```apex
@AuraEnabled(cacheable=true)
public static List<Account> getAllAccounts() {
    return [SELECT Id, Name FROM Account];
}
```

In a sandbox with 300 Accounts, this runs fast. But when deployed to an enterprise org with **500,000 Accounts**, this query will hit governor limits or choke the client.

👉 **Golden Rule:** Never design an LWC based on developer org data volume. Always design for **10x, 100x, or 1,000x** the volume.

---

### 🏢 Real Production Scenario

Consider a call-center org with over **600,000 Accounts and Contacts**.

A developer initially built a contact search page with:
- All records requested on initialization
- Multiple independent un-cached Apex calls
- No search debouncing
- No pagination

When deployed, agents reported: *"Salesforce is freezing when looking up customers."*

After applying the 10 optimization techniques:
- Queries were limited to 50 results with pagination
- Debouncing was added to all search inputs
- Fields were trimmed down to only those shown in the table
- Read-only queries used `@AuraEnabled(cacheable=true)`
- Related charts were lazy-loaded on separate tabs

**Result:** Page load time dropped by **78%**, and server Apex execution time decreased by **85%**.

---

### 💡 Final Thoughts

LWC performance optimization is rarely about clever micro-optimizations. It is about eliminating unnecessary work:

> **Less Data + Fewer Server Calls + Efficient Apex + Smart Rendering = High Performance LWC**

When building your next component, ask yourself:
1. *Does the user really need all this data right now?*
2. *Will this still perform quickly when the database has 100,000 records?*

Adopting these habits will make the difference between a prototype component and a scalable enterprise solution.