import DTMedicalVisit from "pages/Report/DTMedicalVisit";
import Navbar from "components/Navbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import ApaeCatalog from "pages/Catalog/Apae";
import HealthCatalog from "pages/Catalog/Health";
import HealthProDetails from "pages/Catalog/Health/components/HealthProDetails";
import SocialCatalog from "pages/Catalog/Social";
import SocialProDetails from "pages/Catalog/Social/components/SocialProDetails";
import Home from "pages/Home";
import DTHealthProByDay from "pages/Report/DTHealthProByDay";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "utils/history";
import DTMedicalVisitByPeriod from "pages/Report/DTMedicalVisitByPeriod";
import PrescriptionTotal from "pages/Dashboard/PrescriptionTotal";
import DashHealthPro from "pages/Dashboard/DashHealthPro";
import PageInConstruction from "components/PageInConstruction";

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/hp" exact>
        <HealthCatalog />
      </Route>
      <Route path="/hp/:hpId" exact>
        <HealthProDetails />
      </Route>
      <Route path="/hp/pro/byDay">
        <DTHealthProByDay />
      </Route>

      <Route path="/social" exact>
        <SocialCatalog />
      </Route>
      <Route path="/social/:socialId">
        <SocialProDetails />
      </Route>

      <Route path="/apae" exact>
        <ApaeCatalog />
      </Route>

      <Route path="/visits" exact>
        <DTMedicalVisit />
      </Route>

      <Route path="/dashboard-prescription" exact>
        <PrescriptionTotal />
      </Route>

      <Route path="/dash-helth-pro" exact>
        <DashHealthPro />
      </Route>

      <Route path="/dash-apae-social" exact>
        <PageInConstruction />
      </Route>

      <Route path="/visits/byperiod">
        <DTMedicalVisitByPeriod />
      </Route>

      <Redirect from="/auth" to="/auth/login" exact />
      <Route path="/auth">
        <Auth />
      </Route>

      <Redirect from="/admin" to="/admin/hp" exact />
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
