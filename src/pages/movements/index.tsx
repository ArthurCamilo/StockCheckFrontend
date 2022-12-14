import React from 'react';
import { Content, Button, SearchBar, SearchIcon, TopSection, SearchBarWrapper } from '../../globalStyles';
import { Column } from '../../components/table';
import { EditColumn } from '../../components/edit';
import Edit from '../../components/edit';
import Table from '../../components/table';
import { FaPlus } from 'react-icons/fa'
import { useData } from '../../contexts/data';

const Movements: React.FC = () => {

  const { movements, products, vendors, movement, handleMovementDelete, handleMovementEdit, editMovement, returnToList } = useData();

  const columns: Column[] = [
    { key: 'type', display: 'Tipo', type: 'string' },
    { key: 'product', display: 'Produto', displayFunction: (item: any) => { return products.find(p => p._id === item.product)?.name} , type: 'string' },
    { key: 'vendor', display: 'Fornecedor', displayFunction: (item: any) => { return vendors.find(p => p._id === item.vendor)?.name}, type: 'string' },
    { key: 'quantity', display: 'Quantidade', type: 'number' },
    { key: 'date', display: 'Data', type: 'date' }
  ];
  
  const editColumns: EditColumn[] = [
    { key: 'type', display: 'Tipo', type: 'string', size: 300, inputType: 'select', options: [{ key: 'Entrada', value: 'Entrada' }, { key: 'Saída', value: 'Saída' }]},
    { key: 'product', display: 'Produto', type: 'string', size: 300, inputType: 'select', options: products.map(prod => { return { key: prod._id || "", value: prod.name }})},
    { key: 'vendor', display: 'Fornecedor', type: 'string', size: 300, inputType: 'select', options: vendors.map(supp => { return { key: supp._id || "", value: supp.name }})},
    { key: 'quantity', display: 'Quantidade', type: 'number', size: 300, inputType: 'input', options: null },
    { key: 'date', display: 'Data', type: 'date', size: 300, inputType: 'input', options: null }
  ];

  return (
    <Content>
      {movement == null ? (
        <>
          <TopSection>
            <SearchBarWrapper>
              <SearchIcon />
              <SearchBar placeholder="Nome, email" />
            </SearchBarWrapper>
            <Button display='action' onClick={() => editMovement(null)}><FaPlus size={10} />&nbsp;Nova Movimentação</Button>
          </TopSection>
          <Table columns={columns} items={movements} select={editMovement} />
        </>
      ) : (
        <Edit item={movement} columns={editColumns} saveItem={handleMovementEdit} deleteItem={handleMovementDelete} returnToList={() => returnToList()} />
      )}
    </Content>
  );
};

export default Movements;