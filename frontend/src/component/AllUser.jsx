import react, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  styled,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getUsers } from "../api";
import TableSortLabel from "@mui/material/TableSortLabel";
import Pagination from "./Pagination";
import _ from "lodash";
import SearchIcon from '@mui/icons-material/Search';


const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
  }
`;

const TableSort = styled(TableSortLabel)`
  & > th {
    font-size: 20px;
  }
`;
const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;

export const AllUser = ({ findvalue }) => {
  const [users, setUsers] = useState([]);
  const [pageNo, setPagination] = useState(1);
  const [itemsPerPage] = useState(5);
  const [lastPage, setLastPage] = useState(false);
  const [order, setOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");


  const handleSearch = _.debounce((e) => {
    let { value } = e.target;
    setPagination(1);
    setSearchValue(value, () => setPagination(1));
  }, 600);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [order, pageNo, itemsPerPage, searchValue]);

  const getAllUsers = async () => {
    const paramsObj = {
      page_offset: pageNo - 1,
      page_size: itemsPerPage,
      sort_order: order,
      search_value: searchValue
    };
    let response = await getUsers(paramsObj);
    console.log(response);
    if (response?.data.length < itemsPerPage) setLastPage(true);
    setUsers(response.data);
  };

  const toggleSortOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <StyledTable>
      <TextField
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            InputLabelProps={{ style: { ...{ top: `${-7}px` } } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <img src={SearchIcon} alt="" />
                </InputAdornment>
              ),
            }}
          />
    
      <TableHead>
        <THead>
          <TableCell>Serial No.</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableSort active={true} direction={order} onClick={toggleSortOrder}>
            <TableCell>Created At</TableCell>
          </TableSort>
          {/* <TableCell></TableCell> */}
        </THead>
      </TableHead>
      <TableBody>
        {users.map((user, i) => (
          <TRow key={i + 1}>
            <TableCell>{i + 1 + (pageNo - 1) * itemsPerPage}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.createdAt}</TableCell>
          </TRow>
        ))}
      </TableBody>

      <Pagination
        pageNo={pageNo}
        setPagination={setPagination}
        lastPage={lastPage}
      />
    </StyledTable>
  );
};

// export default AllUsers;
