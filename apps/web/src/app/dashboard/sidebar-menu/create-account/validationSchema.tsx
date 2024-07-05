import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required("Please enter your password").min(8, "Your password is too short"),
})