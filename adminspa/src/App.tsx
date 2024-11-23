import React, { useRef } from 'react';
import './App.css';
import { Button, Actions, BlockAccordion, BlockContent, Paragraph, Tabs, Flex, FlexItem, HeaderMenu, Card, Grid, Block, AlertBlock } from '@qiwi/pijma-desktop';
import { cache, themes, fonts, reset, CacheProvider, ThemeProvider, Global, TextField } from '@qiwi/pijma-desktop';
import { ApprovGridComponent } from './components/approvGridComponent';
import { testData } from './test/testData';
import { ActiveSessions } from './pages/activeSessions';
import { ServerAdministration } from './pages/serverAdministration';
import { fetchReservations, sendReservation } from './api/api';
import { CreateUser } from './pages/createUser';

function App() {
  const [opened, setOpened] = React.useState([] as any);
  const [selectTab, setSelectTab] = React.useState(0);
  const [reservations, setReservations] = React.useState<any>(null);
  const [disabledButtons, setDisabledButtons] = React.useState<number[]>([]);

  React.useEffect(() => {
    fetchReservations().then(res => setReservations(res));
  }, []);

  const handleApprove = async (id: number, begin: string, end: string, status: string) => {
    setDisabledButtons((prevState) => [...prevState, id]);
    try {
      const response = await sendReservation(id, begin, end, status)
      alert(`${JSON.stringify(response.message)}`);
    } catch (error) {
      console.error('Error sending reservation:', error);
    }
  };

  const handleTabClick = (index: number) => {
    setSelectTab(index);
  };


  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={themes.orange}>
        <Global styles={[reset, fonts]} />
        <Flex direction='column'>
          <Card style={{ width: '100%', backgroundColor: '#fff', padding: '20px', height: '80px' }}>
            <HeaderMenu
              data-testid="header-menu"
              children={[
                { title: 'Подтверждение брони', active: selectTab === 0, onClick: () => handleTabClick(0) },
                { title: 'Активные сессии', active: selectTab === 1, onClick: () => handleTabClick(1) },
                { title: 'Администрирование', active: selectTab === 2, onClick: () => handleTabClick(2) },
                { title: 'Регистрация пользователей', onClick: () => handleTabClick(3) },
              ]}
            />
          </Card>
          {selectTab === 3 ? (
            <CreateUser />
          ) :
          selectTab === 2 ? (
            <ServerAdministration />
          ) : selectTab === 1 ? (
            <ActiveSessions />
          ) : (
            <FlexItem width={'100%'} align='center' py={'20px'}>
              <Block>
                <BlockAccordion
                  opened={opened}
                  onChange={(opened) => setOpened(opened)}
                  items={reservations ? reservations.reservations.map((item: { user: any; begin: string; end: string; id: number }) => {
                    return {
                      title: `${item.user} - ${new Date(item.begin).toLocaleString()} до ${new Date(item.end).toLocaleString()}`,
                      content: (
                        <Flex>
                          <ApprovGridComponent data={item} />
                          <FlexItem width={'20%'} align='center' pt={'100px'} pl={'20px'}>
                            <Actions data-testid="actions" size="accent">
                              <Button type="button" kind="brand" size="accent" text="approve" disabled={disabledButtons.includes(item.id)} onClick={() => handleApprove(item.id, item.begin, item.end, 'подтверждено')} />
                              <Button type="button" kind="simple" size="accent" text="denied" disabled={disabledButtons.includes(item.id)} onClick={() => handleApprove(item.id, item.begin, item.end, 'отклонено')} />
                            </Actions>
                          </FlexItem>
                        </Flex>
                      ),
                    };
                  }) : []}
                />
                <FlexItem width={'20%'} align='center'></FlexItem>
              </Block>
            </FlexItem>
          )}
        </Flex>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
