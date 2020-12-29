import React from "react"
import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
import "firebase/app"
import App from "./src/app"
export const wrapRootElement = ({element}) => <App>{element}</App>
