import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Eye } from 'iconsax-react';

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

import { LoadingButton } from '@mui/lab';
import Page from '../components/Page';

import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { GroupListHead, GroupListToolbar, GroupMoreMenu } from '../sections/@dashboard/GroupManagement';
import { TYPES, groupList, GroupActive } from '../Redux/Actions/UserActions';

import { errorsSelector } from '../Redux/Selectors/ErrorSelectors';
import { isLoadingSelector } from '../Redux/Selectors/StatusSelectors';
import { getToken } from '../Redux/Selectors/UserSelectors';
import { HttpClient } from "../Redux/Controllers";



const TABLE_HEAD = [
  { id: 'name', label: 'Group Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'createdBy', label: 'Created By', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'view', label: 'View', alignRight: false },
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
    const res = filter(array, (_user) => _user.groupName.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    if (res.length > 0) {
      return res;
    }

    const description = filter(array, (_user) => _user.description.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    if (description.length > 0) {
      return description;
    }

    const firstname = filter(array, (_user) => _user.createdBy.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    if (firstname.length > 0) {
      return firstname;
    }

    const lastname = filter(array, (_user) => _user.createdBy.lastname.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    if (lastname.length > 0) {
      return lastname;
    }

  }
  return stabilizedThis.map((el) => el[0]);
}

export default function GroopManagement() {
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
    dispatch(groupList('', (result) => {
      setUSERLIST(result?.data);

    }))
  }, [accessToken]);





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

  function changeStatus(status, groupId) {
    const data = {
      'groupId': groupId,
      'isActive': status
    }
    dispatch(GroupActive(data, (result) => {
      const newUserList = USERLIST.map(user => {
        if (user._id === groupId) {
          user.isActive = status;
        }
        return user;
      })
      setUSERLIST(newUserList);
    }))
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const getgrooptype = (t) => {
    switch (t) {
      case "1":
        return 'Outer Circle'
      case "2":
        return 'Inner Circle'
      default:
        return 'Public Circle'

    }
  }



return (
  <>
    {errors && errors}
    {isLoading && isLoading}
    <Page title="Groop Management">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Groop Management
          </Typography>
        </Stack>

        <Card>

          <GroupListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Stack direction="row" alignItems="right" justifyContent="space-between" mb={1}>
            {/* <Link to='/dashboard/create-group'>
              <LoadingButton>Create Group</LoadingButton>
             </Link> */}
          </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <GroupListHead
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
                    const { _id, groupName, description, groopType, isActive, createdBy, memberList } = row;
                    const isItemSelected = selected.indexOf(groupName) !== -1;

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
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {groupName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="left">
                          {getgrooptype(groopType)}

                        </TableCell>


                        <TableCell align="left">{createdBy.firstname} {createdBy.lastname}</TableCell>
                        <TableCell align="left" onClick={() => changeStatus(!isActive, _id)}>
                          <Label variant="ghost" color={(isActive === true && 'success') || 'error'}>
                            {(isActive === true) ? 'Active' : 'Blocked'}
                          </Label>
                        </TableCell>
                        <TableCell align="left"><Link to ="/dashboard/user-listed-group" state={{ group: groupName , user:memberList  }}><Eye size="32" color="#dce775" /></Link></TableCell>
                        <TableCell align="right">
                          {/* <GroupMoreMenu /> */}
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
