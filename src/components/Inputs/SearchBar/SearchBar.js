import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import styles from './styles'

const useStyles = makeStyles(styles);

export default function SearchBar(props) {

    const classes = useStyles();
    return(
        <React.Fragment>
            <InputBase
             className={classes.input}
             placeholder='Aku mau belanja'/>
        </React.Fragment>
    )
}