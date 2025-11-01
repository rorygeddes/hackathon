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

You can add a friend, see them in People (Split), and invite to a group. 

 

 

 

 

 

 

 

 

 