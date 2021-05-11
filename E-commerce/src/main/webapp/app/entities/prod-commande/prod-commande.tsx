import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prod-commande.reducer';
import { IProdCommande } from 'app/shared/model/prod-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProdCommandeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProdCommande = (props: IProdCommandeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { prodCommandeList, match, loading } = props;
  return (
    <div>
      <h2 id="prod-commande-heading">
        Prod Commandes
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Prod Commande
        </Link>
      </h2>
      <div className="table-responsive">
        {prodCommandeList && prodCommandeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantite</th>
                <th>Produit</th>
                <th>Commande</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prodCommandeList.map((prodCommande, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prodCommande.id}`} color="link" size="sm">
                      {prodCommande.id}
                    </Button>
                  </td>
                  <td>{prodCommande.quantite}</td>
                  <td>{prodCommande.produitId ? <Link to={`produit/${prodCommande.produitId}`}>{prodCommande.produitId}</Link> : ''}</td>
                  <td>
                    {prodCommande.commandeId ? <Link to={`commande/${prodCommande.commandeId}`}>{prodCommande.commandeId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prodCommande.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prodCommande.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prodCommande.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Prod Commandes found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prodCommande }: IRootState) => ({
  prodCommandeList: prodCommande.entities,
  loading: prodCommande.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProdCommande);
