import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { shallowEqual,useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Page from '../components/Page';

import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { userList,BlockUnBlock,TYPES } from '../Redux/Actions/UserActions';

import { errorsSelector } from '../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../Redux/Selectors/StatusSelectors';
import { getToken } from '../Redux/Selectors/UserSelectors';
import { HttpClient } from "../Redux/Controllers";

const TABLE_HEAD = [
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile Number', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
   { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    const res =  filter(array, (_user) => _user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    
    if(res.length>0){
      console.log(res);
      return res;
    } 
    
    const lastFilter = filter(array, (_user) => _user.lastname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    
    if(lastFilter.length>0){
      return lastFilter;
    }

    const userFilter = filter(array, (_user) => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    if(userFilter.length>0){
      return userFilter;
    }

    const mobileFilter = filter(array, (_user) => _user.phone.mobileNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    if(mobileFilter.length>0){
      return mobileFilter;
    }

  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const dispatch = useDispatch();
  
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [USERLIST, setUSERLIST] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const errors = useSelector((state) => errorsSelector([TYPES.USER_LIST], state), shallowEqual);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.USER_LIST], state));  
  const accessToken = useSelector(getToken);

  useEffect(() => {
        HttpClient.setAuthorization(accessToken);
        dispatch(userList('',(result) => {
            setUSERLIST(result?.data);
          
        }))
  },[accessToken]);

  

 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {

    setFilterName(event.target.value);
  };

  function changeStatus(status,userId) {
        const data = {
          'userId':userId,
          'isBlocked':status
        }
       dispatch(BlockUnBlock(data,(result) => {
        const newUserList = USERLIST.map(user => {
          if(user._id === userId){
            user.isBlocked = status;
          }
          return user;
        })
        setUSERLIST(newUserList);
      }))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  return (
    <>
    { errors && errors}
    { isLoading && isLoading}
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            User Listing
          </Typography>
        </Stack>
  
        <Card>
          
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, firstname, lastname,userName,isBlocked,phone,profileImage } = row;
                     const isItemSelected = selected.indexOf(firstname) !== -1;

                    return (
                       <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell align="left">{row.id}</TableCell>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, firstname)} />
                        </TableCell> */}
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstname} src={profileImage} />
                            <Typography variant="subtitle2" noWrap>
                              {firstname}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{lastname}</TableCell>
                        <TableCell align="left">{userName}</TableCell>
                        <TableCell align="left">{phone.mobileNumber}</TableCell>
                        <TableCell align="left" onClick={() => changeStatus(!isBlocked,_id)}>
                          <Label variant="ghost" color={(isBlocked === false && 'success') || 'error'}>
                            {(isBlocked === false) ? 'Active':'Blocked'}
                          </Label>
                        </TableCell>
                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                        <TableCell align="right">
                          {/* <UserMoreMenu /> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
    </>
  );
}
