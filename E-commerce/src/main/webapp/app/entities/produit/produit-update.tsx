import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { getEntity, updateEntity, createEntity, reset } from './produit.reducer';
import { IProduit } from 'app/shared/model/produit.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProduitUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProduitUpdate = (props: IProduitUpdateProps) => {
  const [categorieId, setCategorieId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { produitEntity, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/produit' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...produitEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="eCommerceAppApp.produit.home.createOrEditLabel">Create or edit a Produit</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : produitEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="produit-id">ID</Label>
                  <AvInput id="produit-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomLabel" for="produit-nom">
                  Nom
                </Label>
                <AvField
                  id="produit-nom"
                  type="text"
                  name="nom"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="imgLabel" for="produit-img">
                  Img
                </Label>
                <AvField
                  id="produit-img"
                  type="text"
                  name="img"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="prixLabel" for="produit-prix">
                  Prix
                </Label>
                <AvField
                  id="produit-prix"
                  type="string"
                  className="form-control"
                  name="prix"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    min: { value: 0, errorMessage: 'This field should be at least 0.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="produit-categorie">Categorie</Label>
                <AvInput id="produit-categorie" type="select" className="form-control" name="categorieId" required>
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/produit" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.categorie.entities,
  produitEntity: storeState.produit.entity,
  loading: storeState.produit.loading,
  updating: storeState.produit.updating,
  updateSuccess: storeState.produit.updateSuccess,
});

const mapDispatchToProps = {
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProduitUpdate);
