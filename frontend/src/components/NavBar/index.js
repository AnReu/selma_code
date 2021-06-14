import React from 'react';

import {AppBar, FormControl, InputLabel, MenuItem, Select, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import NavTitle from "./NavTitle";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
    grow: {
        flexGrow: 1,
    },
}));

const NavBar = ({headings, initialModelLanguage, initialModel, onModelChange, onModelLanguageChange}) => {
    const classes = useStyles();
    const [modelLanguage, setModelLanguage] = React.useState(initialModelLanguage);
    const [model, setModel] = React.useState(initialModel);

    const handleChangeModelLanguage = (event) => {
        let value = event.target.value;
        setModelLanguage(value);
        onModelLanguageChange(value);
    };

    const handleChangeModel = (event) => {
        let value = event.target.value;
        setModel(value);
        onModelChange(value);
    };

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                {headings.map((heading, i) =>
                    <NavTitle heading={heading} key={i}/>
                )}
                <div className={classes.grow} />
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="model-label">Model</InputLabel>
                        <Select
                            labelId="model-label"
                            id="model"
                            value={model}
                            onChange={handleChangeModel}
                        >
                            <MenuItem value={'tf_idf'}>TF_IDF Model</MenuItem>
                            <MenuItem value={'vector'}>Vector Model</MenuItem>
                            <MenuItem value={'boolean'}>Boolean Model</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="model-language-label">Model Language</InputLabel>
                        <Select
                            labelId="model-language-label"
                            id="model-language"
                            value={modelLanguage}
                            onChange={handleChangeModelLanguage}
                        >
                            <MenuItem value={'english'}>English</MenuItem>
                            <MenuItem value={'german'}>German</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;