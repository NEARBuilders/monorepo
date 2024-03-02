const accountId = context.accountId;
const requestSignIn = props.requestSignIn;
const logOut = props.logOut;
const handleCloseMenu = props.handleCloseMenu;

if (accountId) {
  return <button onClick={() => logOut()}>log out</button>;
} else {
  return <button onClick={() => requestSignIn()}>sign in</button>;
}

// {props.signedIn ? (
//           <Widget src="efiz.near/widget/placeholder" />
//         ) : (
//           <SignInButton
//             onSignIn={() => {
//               props.onCloseMenu();
//               props.requestSignIn();
//             }}
//           />
//         )}
//         <ul className="top-links">
//           <li>
//             <NavigationButton route="/">
//               <Home />
//               Home
//             </NavigationButton>
//           </li>
//           <li>
//             <NavigationButton
//               disabled={!props.signedIn}
//               route={`/${props.widgets.profilePage}?accountId=${props.signedAccountId}`}
//             >
//               <UserCircle />
//               Profile
//             </NavigationButton>
//           </li>
//           <li>
//             <NavigationButton route="/edit">
//               <Code />
//               Editor
//             </NavigationButton>
//           </li>
//           <li>
//             <NavigationButton href={props.documentationHref}>
//               <Book />
//               Documentation
//             </NavigationButton>
//           </li>
//         </ul>
//         <ul className="bottom-links">
//           {props.widgetSrc?.edit && (
//             <li>
//               <Link to={`/edit/${props.widgetSrc?.edit}`}>
//                 <Fork />
//                 {props.widgetSrc.edit.startsWith(
//                   `${props.signedAccountId}/widget/`
//                 )
//                   ? "Edit widget"
//                   : "Fork widget"}
//               </Link>
//             </li>
//           )}
//           {props.widgetSrc?.view && (
//             <li>
//               <Link
//                 to={`/${props.widgets.viewSource}?src=${props.widgetSrc?.view}`}
//               >
//                 <Code />
//                 View source
//               </Link>
//             </li>
//           )}
//           {props.signedIn && (
//             <li>
//               <button onClick={() => props.logOut()} className="log-out-button">
//                 <LogOut />
//                 Sign Out
//               </button>
//             </li>
//           )}
//         </ul>
//         */}
