import React from 'react'
import {Block,Box, Paragraph, Flex} from '@qiwi/pijma-desktop'
import { testData } from '../test/testData'


export const ApprovGridComponent: React.FC<any> = ({data}) => {
    return (
        <Flex direction='column'>
           <Paragraph size='m'>Процессор: {data.server.cpu}</Paragraph>
      <Paragraph size='m'>Оперативная память: {data.server.memory} GB</Paragraph>
      <Paragraph size='m'>Диск: {data.server.drive} GB</Paragraph>
      <Paragraph size='m'>Видеокарта: {data.server.gpu}</Paragraph>
      <Paragraph size='m'>Операционная система: {data.os}</Paragraph>
            <Block>
            <Box m={'20px'}>
            <Paragraph size='m'>{data.description}</Paragraph>
            </Box>
            </Block>
          
        </Flex>
    )
}



