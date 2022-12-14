import React, { useState } from 'react';
import { Content, Button, SearchBar, SearchIcon, TopSection, SearchBarWrapper } from '../../globalStyles';
import { Column } from '../../components/table';
import { EditColumn, Option } from '../../components/edit';
import Edit from '../../components/edit';
import Table from '../../components/table';
import Vendor from '../../models/vendor';
import { FaPlus, FaExchangeAlt } from 'react-icons/fa'
import { useData } from '../../contexts/data';

const Vendors: React.FC = () => {

  const { vendors, vendor, handleVendorDelete, handleVendorEdit, editVendor, returnToList } = useData();

  const columns: Column[] = [
    { key: 'name', display: 'Nome', type: 'string' },
    { key: 'email', display: 'Email', type: 'string' },
    { key: 'phone', display: 'Telefone', type: 'string' },
  ];
  
  const editColumns: EditColumn[] = [
    { key: 'name', display: 'Nome Fantasia', type: 'string', size: 500, inputType: 'input', options: null},
    { key: 'email', display: 'E-mail', type: 'string', size: 500, inputType: 'input', options: null},
    { key: 'phone', display: 'Telefone', type: 'string', size: 200, inputType: 'input', options: null},
  ];

  return (
    <Content>
      {vendor == null ? (
        <>
          <TopSection>
            <SearchBarWrapper>
              <SearchIcon />
              <SearchBar placeholder="Nome, email" />
            </SearchBarWrapper>
            <Button display='action' onClick={() => editVendor(null)}><FaPlus size={10} />&nbsp;Novo Fornecedor</Button>
          </TopSection>
          <Table columns={columns} items={vendors} select={editVendor} />
        </>
      ) : (
        <Edit item={vendor} columns={editColumns} saveItem={handleVendorEdit} deleteItem={handleVendorDelete} returnToList={() => returnToList()} />
      )}
    </Content>
  );
};

export default Vendors;