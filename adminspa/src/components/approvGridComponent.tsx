import React from 'react'
import {Block,Box, Paragraph, Flex} from '@qiwi/pijma-desktop'



export const ApprovGridComponent: React.FC<any> = ({data}) => {
    return (
        <Flex direction='column' mt={'10px'} >
            {data.status === 'подтверждено' &&
            <Flex direction='column'>
        <Paragraph size='m'>Процессор: {data.server.cpu}</Paragraph>
        <Paragraph size='m'>Память: {data.server.memory}</Paragraph>
        <Paragraph size='m'>Диск: {data.server.drive}</Paragraph>
        <Paragraph size='m'>Видеокарта: {data.server.gpu}</Paragraph>
        <Paragraph size='m'>Мак адресс: {data.server.mac_address}</Paragraph>
        </Flex>
        }
      <Paragraph size='m'>Операционная система: {data.os}</Paragraph>
        <Flex>
            <Block>
            <Box m={'20px'}>
            <Paragraph size='m'>{data.description}</Paragraph>
            </Box>
            </Block>
            </Flex>
        </Flex>
    )
}



