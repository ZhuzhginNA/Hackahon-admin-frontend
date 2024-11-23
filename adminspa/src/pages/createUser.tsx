import React from 'react';
import { Flex, FlexItem, Box, Block, TextField, PasswordField, Button,Title } from '@qiwi/pijma-desktop'
import{postClient} from '../api/api'

export const CreateUser: React.FC = () => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const handleSave = () => {
    // Заглушка для сохранения пользователя
   const email = login

    postClient(name, password, email).then((res) => {    
      console.log(res)
    });
  };

  return (
    <Flex direction='column' align='center' justify='center' style={{ height: '100vh' }}>
      <FlexItem align='center' width={'600px'}>
        <Flex pl={'55px'}>
        <Title size={'2'} >Создание пользователя</Title>
        </Flex>
        <Block>
          <Box style={{ padding: '40px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <TextField title='Имя' type='text' value={name} onChange={(name) => setName(name)} />
            <TextField title='Логин' type='text' value={login} onChange={(login) => setLogin(login)} />
            <PasswordField title='Пароль' name='password' viewed={false} value={password} onChange={(password) => setPassword(password)} />
                <Flex pl={'80px'} width={'420px'}>
            <Button type='button' kind='brand' size='normal' text='Создать пользователя' onClick={handleSave} />
            </Flex>
          </Box>
        </Block>
      </FlexItem>
    </Flex>
  );
};
