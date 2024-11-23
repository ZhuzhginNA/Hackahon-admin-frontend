import React from 'react'
import {Block,Box, Paragraph, Flex, FlexItem, Actions, Button, BlockAccordion} from '@qiwi/pijma-desktop'
import { testData } from '../test/testData'
import { ApprovGridComponent } from '../components/approvGridComponent'

export const ActiveSessions: React.FC<any> = () => {
    const [opened, setOpened] = React.useState([] as any)
    const filteredItemsbyStatus = testData.reservations.filter(item => item.status === 'подтверждено')
    return (
        <Flex>
            <FlexItem width={'100%'}>
            <Block>
  <BlockAccordion
  opened={opened}
  onChange={(opened) => setOpened(opened)}
  items = {filteredItemsbyStatus.map((item) => {
    return {
      title:  `${item.user} - ${new Date(item.begin).toLocaleDateString()} до ${new Date(item.end).toLocaleDateString()} `,
      content: <Flex>
        <ApprovGridComponent data={item} /> 
        </Flex>,
    }
  })}
  />
  
  <FlexItem width={'20%'} align='center' > 
  
  </FlexItem>
  </Block>
            </FlexItem>
        </Flex>
    )
}