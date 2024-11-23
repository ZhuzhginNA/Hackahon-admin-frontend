import React, { useRef } from 'react';
import './App.css';
import {Button,Actions, BlockAccordion, BlockContent, Paragraph, Tabs, Flex, FlexItem, HeaderMenu, Card, Grid, Block} from '@qiwi/pijma-desktop'
import {cache, themes, fonts, reset, CacheProvider, ThemeProvider, Global, TextField} from '@qiwi/pijma-desktop'
import { ApprovGridComponent } from './components/approvGridComponent'
import { testData } from './test/testData'
import { ActiveSessions } from './pages/activeSessions'
import { ServerAdministration } from './pages/serverAdministration'


function App() {
  const [opened, setOpened] = React.useState([] as any)
  const [selectTab, setSelectTab] = React.useState(0)

  console.log(window.location.href)

  const handleTabClick = (index: number) => {
    setSelectTab(index)
  }

  const filteredItemsbyStatus = testData.reservations.filter(item => item.status === 'на рассмотрении')
  return (
    
    <CacheProvider value={cache}>
    <ThemeProvider theme={themes.orange}>
      <Global styles={[reset, fonts]}/>
      <Flex direction='column'>
        <Card style={{ width: '100%', backgroundColor: '#fff', padding: '20px', height: '80px'}}>
  <HeaderMenu
    data-testid="header-menu"
    children={[
      
        { title: 'Подтверждение брони', active: selectTab === 0, onClick: () => handleTabClick(0) },
        { title: 'Активные сессии', active: selectTab === 1, onClick: () => handleTabClick(1) },
        { title: 'Администрирование', active: selectTab === 2, onClick: () => handleTabClick(2) },
      
    ]}
  />
</Card>
{ selectTab === 2 ? <ServerAdministration /> : selectTab === 1 ? <ActiveSessions /> :  
<FlexItem width={'100%'} align='center' py={'20px'}>
  
  <Block>
  <BlockAccordion
  opened={opened}
  onChange={(opened) => setOpened(opened)}
  items = {filteredItemsbyStatus.map((item) => {
    return {
      title:  `${item.user} - ${new Date(item.begin).toLocaleDateString()} до ${new Date(item.end).toLocaleDateString()} `,
      content: <Flex>
        <ApprovGridComponent data={item} /> 
        <FlexItem width={'20%'} align='center' pt={'100px'} pl={'20px'} >
        <Actions data-testid="actions" size="accent">
      <Button type ="button" kind="brand" size="accent" text="approve" />
      <Button type ="button" kind="simple" size="accent" text="denied" />
    </Actions>
    </FlexItem>
        </Flex>,
    }
  })}
  />
  
  <FlexItem width={'20%'} align='center' > 
  
  </FlexItem>
  </Block>
  </FlexItem>
}
  </Flex>
    </ThemeProvider>
  </CacheProvider>
    )
  
}

export default App;
