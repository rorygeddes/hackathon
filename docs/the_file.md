Finance App Brainstorming: 

Features:  

Insights compiled from all bank accounts, investments, 

Advice from chat 

From coffee to tuition where does the saving go to 

Insights beyond pie charts, directed actionable insights 

Auto Connect Bank Account using Plaid API to see live time view of all accounts 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

How important is it to have multiple accounts? Needed for the first demo? Or can we talk about or mention it in the presentation 

What are the stand out features?  

Ai generates image/skeleton of the image/ greyed out/ some way to show its in progress that gets filled in as you save money towards that goal 

 

Technical aspects: 

Image gen 

User db  

Simple/usable ui  

Goal calculation 

Iets you calculate/create an outline/plan to achieve goal of affording something 

Input: I want to buy an M5 

Output: your income is x, your monthly spendings are y, if you did abc it would take z years to buy this  

Plan: Dude you need to make more money, get a promotion or a better job otherwise you wont live to see the day you can afford one 

Insights and actionable steps 

Chill out with the starbucks is negative no one wants to drink coffee less what about something like homemade 5min latte recipe better than starbucks recommended by the chat 

Have a live db that tracks changes, we can send in transfers, get it allocated to the goal and see the output of it in terms of the image chaning 

For the demo simualte an etransfer send to an account which automatically deposits into the goal account, and see the image itself change or get fuller 

This is a split that automatically calculates itself. Goal is to get more peers to use the app (e.g. splitting during big group meals) 

Say A, B, C, D are all using the app, and E isn’t. E is still able to etransfer the amount via other methods but E will be able to see the exact amount auto calculated 

I’m struggling to see the problem that is solving, the group meal cost splitting I mean like is it really an issue that people don’t like entering exact amount? Is it life-changing if you send 17$ instead of 17.38? Would an app be needed for that and is this related to the main goal? 

 

Save2See 

 

Functionality 

Use Plaid API Key to connect bank account and login with actual personal bank information 

After the user inputs their info, they will then have their data shown 

The transactions will be automatically categorized by plaid, and also our ai system, however they will be personally reviewed by the user as it must have a human element to it 

When the user sees the transactions come in from all bank accounts, they see what from what the system is already there picks up 

After, they may edit the fields, Ex what is shown from the system:  

Starbucks, Groceries, $10.99 

The user can then see that and say, that’s wrong, and then assign the groceries sub account to be Coffee instead.  

In this editing mode, they can also click the split button, which will then  

Connecting online receipt to the app automatically and it can find the transaction and recommend insights to reduce spending 

 

Dashboard 

We have our main 3 goals we’re trying to accomplish in a nice view when we open the app 

This involves: 

The main image 

The sub-Goals 

 

 

Dashboard View 

Goal 

End Target = 74,000 CAD 

Deadline = Nov 1, 2026 

Current Allocation = 20,000 CAD 

 

Total Goal: 87,000 

 

BMW 74,000 

Image on the left (icon) 

Progress Bar 20 000 / 74,000 

Percentage 

You can click into this to see your ACTIONS 

The AI system will provide options you can select to create an action 

 

Tuition: 10,000 

Europe Trip: 3,000 

Bank Accounts  

Investments  

Splitting 

 

Budget 

Automated Budget 

Logic: takes the prior 3-month average of your spending  

Split 

 

AI Chatbot 

 

Social 

 

 

 

 

MVP 

We have 5 screens: 

1) Dashboard (Home) 

Purpose. A one-look daily pulse: balances, goals progress, budget status, and “what needs attention.” 

Layout (top → bottom). 

Balance strip (total + key accounts; tap to Accounts). 

Goals card 

Title: “Goals” • “Total target $87,000” 

Stacked list (3 items max): 

BMW — icon left, 20,000 / 74,000 progress bar + %; tap → Goal detail. 

Tuition — 0 / 10,000 

Europe Trip — 0 / 3,000 

Budget snapshot 

Shows the categories of each 

Quick actions 

“Categorize 5” • “Add transfer to BMW” • “Invite friend” • “Ask Luni AI”. 

Calculations. 

Budget baseline = avg(last 3 months inflow/outflow) → defines the Monthly Spending pool and cash-flow remainder for Goals.  

Pool guidance (starter ranges): Spending ≈ 60–70% of cash flow; Goals = remainder after Emergency and debts.  

 

 

2) Budget (Automated) 

Logic (MVP). 

Compute last-3-month averages for income/spend → net cash flow.  

Allocate baseline pools: 

Monthly Spending: 60–70% of cash flow (start at 65%).  

Emergency: $250–$500 until filled.  

Goals: remainder after Spending & Emergency.  

Show vs Actual (rollups from categorized transactions/views).  

UI 

“Your automated budget is live (based on last 3 months). Edit anytime.” 

Bars: Spending / Emergency / Goals (Allowance vs. Actual). 

CTA: “Tune budget” → adjust % and lock rules. 

Done when 

User sees baseline and can tweak %s. 

Actuals auto-update as transactions categorize. 

 

3) AI Chatbot (+) 

Mode. Auto-switch between Chat Mode (cheap help) and Agent Mode (reads your data with tools) with visible header state.  

What it can do now 

Answer basics; analyze categories; find transactions; check balances; show “its work” as action bubbles.  

MVP UI 

Header (Luni AI • Chat/Agent), 4 suggested questions, chat bubbles, action bubbles while tools run.  

Tools wired (examples) 

get_spending_by_category, get_account_balances, find_transactions, get_uncategorized_count, social/split readers.  

Done when 

Asking “How much did I spend on food this month?” returns a computed breakdown from your data (with the action bubble trail). 

4) Split 

Overview 

I want it to have 3 main numbers at the top: 

Net  

You Owe (how much you owe to people) 

You Receive (how much people who will receive from) 

Pinned sections: Groups • People 

Group/Person detail 

Members, who owes whom, list of split transactions, archive/restore, delete with confirm.  

Done when 

You can create a group, split to group or person, and see balances/history update. 

 

5) Social (friends/requests) 

MVP 

List: Friends (pending/accepted), Groups (from Split), Requests. 

Actions: Add friend, accept/decline, open DM (future), open related Group/Person split history. 

(Agent tools already include get_friends, get_groups, get_person_split_history for read paths.)  

Done when 

You can add a friend, see them in People (Split), and invite them to a group. 

 

 

 

 

 

 

 

 

https://github.com/rorygeddes/hackathon 

What is Save2See 

Problem: 

 

We Provide: 

Realtime view of your finances 

Actionable Insights to lead you  

 