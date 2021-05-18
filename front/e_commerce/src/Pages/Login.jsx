import React from 'react';
import { Field, Formik, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import api from '../Api/Api';
import { useHistory } from 'react-router';


const Login = ({setConnect}) => {

    const initialValues = {
        username: '',
        password: ''
    }
    
    const validationSchema = yup.object().shape({
        username: yup.string().required("Entrez un nom").min(3, "Min 3 caracteres"),
        password: yup.string().required("Entrez un mdp").min(3, "Min 3 caracteres")
    })

    const history=useHistory()


    const submit = (values) => {
        api.post("/authenticate",values).then((resp)=> {
            localStorage.setItem('token',resp.data.id_token)
            setConnect(true)
            history.push('/')
        })
    }

    return (
        <div>
            <h2 className="text-center">Authentification</h2>

            <div className="container card shadow mt-3 p-3">
                <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
                    <Form>
                        <Field type="text" name="username" placeholder="User name" className="form-control mt-3"/>
                        <ErrorMessage name="username" component="small" className="text-danger float-right"/>
                        <Field type="text" name="password" placeholder="Mot de passe" className="form-control mt-3"/>
                        <ErrorMessage name="password" component="small" className="text-danger float-right"/>
                        <button type="submit" className="btn btn-success btn-block mt-4">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;