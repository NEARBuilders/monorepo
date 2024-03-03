/*

TUTORIAL

Build your own decentralized frontend!

First, we have to get the accountId for the challenge.

Notice how it checks props, and if that is null or undefined,
it returns user's accountId from the page context.

*/

const accountId = props.accountId ?? context.accountId;

/*

WALKTHROUGH

5 minutes or less!

The goal is to demonstrate *composability* of bOS widgets.

INSTRUCTIONS

Step-by-step Process:

1: Navigate to the ForkThis widget, and fork it!

2: Remix / rename that component however you wish.

3: Save your work on the blockchain operating system.

Have you done all of the steps above?

4. Edit the line of code below to display the widget you created.

↓ ↓ ↓ 

*/

return <Widget src="hack.near/widget/ForkThis" />;

/*

5. Don't forget to rename and save this widget!

You will modify above code in the Next Level.

*/
