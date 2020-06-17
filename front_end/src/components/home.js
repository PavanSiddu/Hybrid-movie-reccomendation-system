import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Bg from './particle-background.gif';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: 'flex',
        flexFlow: 'row nowrap',
        textAlign: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '20rem',
    },
    centerContent: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    noTasks: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    iconFill: {
        color: 'blue',
    },
    media: {
        height: '19.925rem',
        margin: '1rem',
    },
    media1: {
        height: '19.925rem',
        margin: '1rem'
    },
    root: {
        textAlign: 'center'
    },
    sectionHeaders: {
        paddingTop: '5px',
        paddingBottom: '10px',
        fontWeight: 'bold',
        fontSize: '45px',
        color: 'white'
    },
})
);


export default function Home() {
    const classes = useStyles();
    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };

    return (
        <div style={{ backgroundImage: `url(${Bg})`, padding: '50px', minHeight: '100vh', paddingBottom: '100px' }}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                    <Typography variant={'h2'} className={classes.sectionHeaders} gutterBottom>
                        Hybrid Movie Recommendation System
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center" >
                        <Grid item xs={4}>
                            <Card
                                className={classes.card}
                                accent='secondary'
                            >
                                <CardHeader className={classes.root} title="Content-Based" />
                                <CardMedia
                                    className={classes.media1}
                                    image={require('./content.PNG')}
                                />
                                <CardActions className={classes.actions} >
                                    <Button variant="contained" color="primary" onClick={handleClickOpen1}>Info</Button>
                                    <Dialog
                                        open={open1}
                                        onClose={handleClose1}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle>{'Content-Based filtering'}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                            <Typography>Content-based filtering, also referred to as cognitive filtering, recommends items based on a comparison between the content of the items and a user profile. The content of each item is represented as a set of descriptors or terms, typically the words that occur in a document.</Typography>
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose1} color="primary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card
                                className={classes.card}
                                accent='secondary'
                            >
                                <CardHeader className={classes.root} title="Collaborative" />
                                <CardMedia
                                    className={classes.media}
                                    image={require('./collab.PNG')}
                                />
                                <CardActions className={classes.actions}>
                                    <Button variant="contained" color="primary" onClick={handleClickOpen2} >Info</Button>
                                    <Dialog
                                        open={open2}
                                        onClose={handleClose2}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle>{'Collaborative filtering'}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                <p>
                                                    Collaborative filtering is a technique that can filter out items that a user might like on the basis of reactions by similar users. It works by searching a large group of people and finding a smaller set of users with tastes similar to a particular user.
                                                </p>
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose2} color="primary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card
                                className={classes.card}
                                accent='secondary'
                            >
                                <CardHeader className={classes.root} title="Hybrid" />
                                <CardMedia
                                    className={classes.media}
                                    image={require('./hybrid.png')}
                                />
                                <CardActions className={classes.actions}>
                                    <Button variant="contained" color="primary" onClick={handleClickOpen3} >Info</Button>
                                    <Dialog
                                        open={open3}
                                        onClose={handleClose3}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle>{'Hybrid-Filtering'}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Hybrid filtering technique is a combination of multiple recommendation techniques like, merging collaborative filtering (CF) with content-based filtering (CB) or vice-versa.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose3} color="primary">
                                                Close
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

// Upload.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

