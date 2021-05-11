import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Produit from './produit';
import Categorie from './categorie';
import Commande from './commande';
import ProdCommande from './prod-commande';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}produit`} component={Produit} />
      <ErrorBoundaryRoute path={`${match.url}categorie`} component={Categorie} />
      <ErrorBoundaryRoute path={`${match.url}commande`} component={Commande} />
      <ErrorBoundaryRoute path={`${match.url}prod-commande`} component={ProdCommande} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
