import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProdCommande, defaultValue } from 'app/shared/model/prod-commande.model';

export const ACTION_TYPES = {
  FETCH_PRODCOMMANDE_LIST: 'prodCommande/FETCH_PRODCOMMANDE_LIST',
  FETCH_PRODCOMMANDE: 'prodCommande/FETCH_PRODCOMMANDE',
  CREATE_PRODCOMMANDE: 'prodCommande/CREATE_PRODCOMMANDE',
  UPDATE_PRODCOMMANDE: 'prodCommande/UPDATE_PRODCOMMANDE',
  DELETE_PRODCOMMANDE: 'prodCommande/DELETE_PRODCOMMANDE',
  RESET: 'prodCommande/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProdCommande>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProdCommandeState = Readonly<typeof initialState>;

// Reducer

export default (state: ProdCommandeState = initialState, action): ProdCommandeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODCOMMANDE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODCOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODCOMMANDE):
    case REQUEST(ACTION_TYPES.UPDATE_PRODCOMMANDE):
    case REQUEST(ACTION_TYPES.DELETE_PRODCOMMANDE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODCOMMANDE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODCOMMANDE):
    case FAILURE(ACTION_TYPES.CREATE_PRODCOMMANDE):
    case FAILURE(ACTION_TYPES.UPDATE_PRODCOMMANDE):
    case FAILURE(ACTION_TYPES.DELETE_PRODCOMMANDE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODCOMMANDE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODCOMMANDE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODCOMMANDE):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODCOMMANDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODCOMMANDE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/prod-commandes';

// Actions

export const getEntities: ICrudGetAllAction<IProdCommande> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODCOMMANDE_LIST,
  payload: axios.get<IProdCommande>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProdCommande> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODCOMMANDE,
    payload: axios.get<IProdCommande>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProdCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODCOMMANDE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProdCommande> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODCOMMANDE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProdCommande> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODCOMMANDE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
