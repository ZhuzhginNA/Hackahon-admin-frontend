import React from 'react'
import {Block,Box, Paragraph, Flex, FlexItem, Actions, Button, BlockAccordion} from '@qiwi/pijma-desktop'
import { ApprovGridComponent } from '../components/approvGridComponent'
import{fetchReservationsApproved} from '../api/api'

export const ActiveSessions: React.FC<any> = () => {
    const [opened, setOpened] = React.useState([] as any)
    const [reservations, setReservations] = React.useState<any>(null)
    React.useEffect(() => {
        fetchReservationsApproved().then(res => setReservations(res));
      }, [])
    return (
        <Flex>
            <FlexItem width={'100%'}>
            <Block>
  <BlockAccordion
  opened={opened}
  onChange={(opened) => setOpened(opened)}
  items = {reservations? reservations.reservations.map((item: { user: any; begin: string | number | Date; end: string | number | Date }) => {
    return {
      title:  `${item.user} - ${new Date(item.begin).toLocaleDateString()} до ${new Date(item.end).toLocaleDateString()} `,
      content: <Flex>
        <ApprovGridComponent data={item} /> 
        </Flex>,
    }
  }) : []}
  />
  
  <FlexItem width={'20%'} align='center' > 
  
  </FlexItem>
  </Block>
            </FlexItem>
        </Flex>
    )
}