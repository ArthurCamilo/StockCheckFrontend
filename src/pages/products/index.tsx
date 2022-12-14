import React from 'react';
import { Content, Button, SearchBar, SearchIcon, TopSection, SearchBarWrapper } from '../../globalStyles';
import { Column } from '../../components/table';
import { EditColumn, Option } from '../../components/edit';
import Edit from '../../components/edit';
import Table from '../../components/table';
import { FaPlus } from 'react-icons/fa'
import { useData } from '../../contexts/data';

const Products: React.FC = () => {

  const { products, product, handleProductDelete, handleProductEdit, editProduct, returnToList } = useData();

  const columns: Column[] = [
    { key: 'name', display: 'Nome', type: 'string' },
    { key: 'quantity', display: 'Quantidade', type: 'number' },
    { key: 'value', display: 'Valor', type: 'number' }
  ];
  
  const editColumns: EditColumn[] = [
    { key: 'name', display: 'Nome', type: 'string', size: 400, inputType: 'input', options: null},
    { key: 'minQuantity', display: 'Quantidade mínima', type: 'number', size: undefined, inputType: 'input', options: null },
    { key: 'maxQuantity', display: 'Quantidade máxima', type: 'number', size: undefined, inputType: 'input', options: null },
    { key: 'quantity', display: 'Quantidade atual', type: 'number', size: undefined, inputType: 'input', options: null },
    { key: 'value', display: 'Valor', type: 'number', size: undefined, inputType: 'input', options: null }
  ];

  return (
    <Content>
      {product == null ? (
        <>
          <TopSection>
            <SearchBarWrapper>
              <SearchIcon />
              <SearchBar placeholder="Código, nome, quantidade" />
            </SearchBarWrapper>
            <Button display='action' onClick={() => editProduct(null)}><FaPlus size={10} />&nbsp;Novo Produto</Button> 
          </TopSection>
          <Table columns={columns} items={products} select={editProduct} />
        </>
      ) : (
        <Edit item={product} columns={editColumns} saveItem={handleProductEdit} deleteItem={handleProductDelete} returnToList={() => returnToList()} />
      )}
    </Content>
  );
};

export default Products;