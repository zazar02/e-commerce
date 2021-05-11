import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProdCommande from './prod-commande';
import ProdCommandeDetail from './prod-commande-detail';
import ProdCommandeUpdate from './prod-commande-update';
import ProdCommandeDeleteDialog from './prod-commande-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProdCommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProdCommandeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProdCommandeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProdCommande} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProdCommandeDeleteDialog} />
  </>
);

export default Routes;
