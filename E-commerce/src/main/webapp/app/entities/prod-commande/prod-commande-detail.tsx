import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prod-commande.reducer';
import { IProdCommande } from 'app/shared/model/prod-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProdCommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProdCommandeDetail = (props: IProdCommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prodCommandeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ProdCommande [<b>{prodCommandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantite">Quantite</span>
          </dt>
          <dd>{prodCommandeEntity.quantite}</dd>
          <dt>Produit</dt>
          <dd>{prodCommandeEntity.produitId ? prodCommandeEntity.produitId : ''}</dd>
          <dt>Commande</dt>
          <dd>{prodCommandeEntity.commandeId ? prodCommandeEntity.commandeId : ''}</dd>
        </dl>
        <Button tag={Link} to="/prod-commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prod-commande/${prodCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prodCommande }: IRootState) => ({
  prodCommandeEntity: prodCommande.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProdCommandeDetail);
