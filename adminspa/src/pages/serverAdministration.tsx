import React from 'react';
import { Block, Box, Paragraph, Flex, SelectField, FlexItem, Grid, Button } from '@qiwi/pijma-desktop';
import { testDataAdminPage } from '../test/testDataAdminPage';
import { testDataServers } from '../test/testDataServers';

export const ServerAdministration: React.FC = () => {
  const [osValues, setOSValues] = React.useState(testDataAdminPage.servers.map(() => ({ id: undefined })));

  const equals = (a: { id: any }, b: { id: any }) => a.id === b.id;

  const osName = testDataServers.os.map((os) => ({
    text: os.name,
    value: { id: os.id }
  }));

  const handleOSChange = (index: number, value: { id: undefined; }) => {
    const newOSValues = [...osValues];
    newOSValues[index] = value;
    setOSValues(newOSValues);
  };

  return (
    <Flex direction='column' pt={'50px'}>
      {testDataAdminPage.servers.map((server, index) => (
        <Flex key={server.id} direction='row' align='center' mb={'20px'}>
          <FlexItem width={'40%'} pl={'20px'}>
            <Paragraph size='m'>{server.id} - {server.os}</Paragraph>
          </FlexItem>
          <FlexItem width={'40%'} pr={'20px'}>
            <SelectField
              title="Операционная система"
              value={osValues[index]}
              items={osName}
              equals={equals}
              onChange={(value) => handleOSChange(index, value)}
            />
          </FlexItem>
          <FlexItem width={'20%'}>
            <Button type='button' kind='brand' size='normal' text='Install' />
          </FlexItem>
        </Flex>
      ))}
    </Flex>
  );
};
