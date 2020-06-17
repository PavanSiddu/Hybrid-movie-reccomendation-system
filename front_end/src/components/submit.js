import React from 'react';
import * as Axios from './../axios.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Bg from './particle-background.gif';
class SimpleExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
    this.load_data();
  }
  load_data() {
    (async () => {
      this.setState({ result: (await Axios.get_recommend(this.props.match.params.data)).data.data });
    })();
  }
  render() {
    // console.log(this.props.match.params.data)
    // console.log(this.state.result)
    // let a = this.state.result;
    // let mov = [];
    // let dat = [];
    // a.forEach((val)=>{
    //   let n = val.length;
    //   for(let i=0;i<n;i++){
    //     if(val[i]=='('){
    //       let str = val.substring(0,i);
    //       let str1 = val.substring(i+1,n-1);
    //        mov.push(str);
    //       dat.push(str1);
    //     }
    //   }
    // })
    // console.log(mov);
    // console.log(dat);
    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 20,
      },
    }))(TableCell);
    const StyledTableRow = withStyles(theme => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
      },
    }))(TableRow);
    let id = 0;
    function createData(item) {
      id += 1;
      return { id, item };
    }
    const rows = [];

    this.state.result.map((strResult) => {
      return (
        rows.push(createData(strResult)
        )
      )
    }
    );


    let head = {
      textAlign: 'center',
      padding: '5px',
      color: 'white',

    };
    const table = {
      margin: '10px 100px 10px 100px',
      padding: '20px',
    };
    const trow = {
      fontSize: '20px',
      fontStyle: 'italic',

    }


    return (
      <div style={{ backgroundImage: `url(${Bg})`, padding: '50px', minHeight: '100vh', paddingBottom: '100px' }}>
        <h1 style={{ textAlign: 'center', color: 'white' }}>The Movies Recommended to User {this.props.match.params.data} are:</h1>
        <div style={table}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={trow}>Recommended Movies</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.item}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default SimpleExpansionPanel;
