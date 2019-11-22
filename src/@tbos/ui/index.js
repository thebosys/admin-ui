import React, { Suspense } from "react";

import { makeStyles } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/indigo";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  Redirect
} from "react-router-dom";
import { useStore } from "@tbos/ui/business/hooks/useStore";
import { hot } from "react-hot-loader/root";
import Drawer from "@tbos/ui/components/Drawer";
import Login from "@tbos/ui/apps/Login";
import StandardContainer from "@tbos/ui/apps/StandardContainer";
import useMetadata from "@tbos/ui/business/hooks/useMetadata";

function App(props) {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { fetch, data, loading: loading, error: error } = useMetadata({
    path: `crm/metadata/get`
  });

  React.useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  const [menuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function renderApp(renderProps) {
    let App = props.apps[renderProps.match.params.name || ""];
    if (error) return "Error";
    if (loading) return <LoadingMessage />;
    if (!App && !data) {
      fetch({ name: renderProps.match.params.name });
      return <LoadingMessage />;
    }
    if (!App && data)
      App = StandardContainer(renderProps.match.params.name, App, data);
    if (!App) return 404;

    return <App toggleMenu={toggleMenu} {...renderProps} />;
  }

  return (
    <div className={classes.root}>
      <Router>
        <Drawer close={toggleMenu} open={menuOpen} menu={props.menu} />

        <main className={classes.content}>
          {!state.user || !state.user.loggedIn ? (
            <Login />
          ) : (
            <Suspense fallback={<LoadingMessage />}>
              <Route exact key="base" path="/login" component={Login} />
              <Route exact path="/" render={renderApp} />
              <Route exact path="/:name" render={renderApp} />
              <Route exact path="/:name/:id" render={renderApp} />
              <Route render={() => "404"} />
            </Suspense>
          )}
        </main>
      </Router>
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 0
  },

  content: {
    flexShrink: 1,
    flexGrow: 1,
    paddingTop: 3,
    backgroundColor: orange[50]
  }
}));

const LoadingMessage = () => "I'm loading...";
