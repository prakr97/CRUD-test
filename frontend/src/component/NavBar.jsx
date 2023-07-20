import { AppBar, InputBase, Toolbar, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { NavLink } from "react-router-dom";
import { AllUser } from "./AllUser";
import { useEffect, useState } from "react";
import _ from "lodash";

const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  color: #ffffff;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  

const NavBar = () => {
  const [pageNo, setPagination] = useState(1);
  const [searchValue, setSearchValue] = useState("")
  
  const handleSearch = _.debounce((e) => {
    let { value } = e.target
    setPagination(1)
    setSearchValue(value, () => setPagination(1))
  }, 600)
  
  //   const renderAllUserComponent = () => {
  //     console.log(searchValue);
  //     if (searchValue) {
  //       return <AllUser findvalue={searchValue} />;
  //     } 
  //     }
    

  // useEffect(() => {
  //   // console.log(searchValue,'---------searchvaleu');
  //   // if(searchValue) 
  //   // return <AllUser findvalue={searchValue}/>
  //   renderAllUserComponent()
  // }, [searchValue]);

  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/create" exact>
          Create User
        </Tabs>
        <Tabs to="/" exact>
          All Users
        </Tabs>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onKeyDown={handleSearch}
          />
        </Search>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
