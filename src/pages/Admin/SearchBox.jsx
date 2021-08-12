import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import USER from 'constants/user.js';
import Dropdown from 'components/Dropdown/DropDown';
import { BiChevronDown } from 'react-icons/bi';
import useDebounce from 'utils/hooks/useDebounce';
import { searchUsersByOption } from 'services/utils/searchUsersByOption.js';

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  margin-left: 8px;
  display: flex;
  background-color: white;
  border: 0.5px solid #edf1f9;
  border-radius: 10px;
  padding: 0 12px;
`;

const StyledInput = styled.input`
  padding: 10px 10px;
  border: 0;
  flex: 1;
  background-color: rgba(0, 0, 0, 0);
`;

export default function SearchBox({ handleOnSearch }) {
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(USER.EN.ID);
  const debouncedValue = useDebounce({ value, delay: 500 });

  const debouncedSearch = useCallback(() => {
    handleOnSearch(searchUsersByOption(debouncedValue, selectedOption));
  }, [handleOnSearch, debouncedValue, selectedOption]);

  useEffect(() => {
    debouncedSearch();
  }, [debouncedSearch]);

  const handleListClick = option => {
    setSelectedOption(option);
  };

  const handleInputChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <SearchBoxContainer>
      <Dropdown
        visibleOption={
          <>
            {USER.KO[selectedOption.toUpperCase()]} <BiChevronDown />
          </>
        }
        optionList={['id', 'name', 'address', 'age']}
        onItemClick={handleListClick}
        print={data => USER.KO[data.toUpperCase()]}
      />
      <InputContainer>
        <StyledInput value={value} type="search" onChange={handleInputChange} />
      </InputContainer>
    </SearchBoxContainer>
  );
}
