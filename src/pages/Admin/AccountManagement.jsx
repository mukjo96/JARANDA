import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { localStorageHelper } from 'utils/localStorageHelper';
import { setUserInfo } from 'services/utils/LocalStorageWorker';
import SignupModal from 'modal/SignupModal';
import LS_KEY from 'constants/localStorageKey';
import Table from 'components/Table/table';
import TableHeader from 'components/Table/tableHeader';
import SearchBox from 'pages/Admin/SearchBox.jsx';
import Pagination from 'pages/Admin/Pagination';

const dataProps = ['id', 'name', 'address', 'cardInfo', 'age', 'role'];

const ITEMS_PER_PAGE = 10;

export default function AccountManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const totalPage = Math.ceil(tableData.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    setTableData(localStorageHelper.getItem(LS_KEY.USER_INFO) ?? []);
  }, []);

  const handleOnSearch = useCallback(result => {
    setTableData(result);
  }, []);

  const handleClickAddUserBtn = () => {
    setIsModalShow(true);
  };

  const handleAddUser = () => {
    setTableData(localStorageHelper.getItem(LS_KEY.USER_INFO));
  };

  const currentPageData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleEditUserRole = data => {
    setUserInfo(data);
    const newTableData = tableData;
    const index = tableData.findIndex(user => user.id === data.id);
    if (index !== -1) {
      newTableData[index] = data;
      setTableData([...newTableData]);
    }
  };

  return (
    <TableContainer>
      <HeaderContainer>
        <TableHeader title="계정 관리" number={tableData.length} />
        <ButtonContainer>
          <SearchBox handleOnSearch={handleOnSearch} />
          <StyledAddUserButton onClick={handleClickAddUserBtn}>
            <AiOutlineUserAdd />
          </StyledAddUserButton>
        </ButtonContainer>
      </HeaderContainer>
      <Table
        dataProps={dataProps}
        currentPageData={currentPageData}
        onItemClick={handleEditUserRole}
      />
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <SignupModal
        isModalShow={isModalShow}
        closeModal={() => setIsModalShow(false)}
        handleAddUser={handleAddUser}
      />
    </TableContainer>
  );
}

const TableContainer = styled.div`
  padding-bottom: 40px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
`;

const StyledAddUserButton = styled.button`
  height: 37px;
  width: 37px;
  background-color: white;
  border: 0.5px solid #edf1f9;
  margin-left: 8px;
  font-size: 14px;
  color: black;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: #dce35b33;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;
