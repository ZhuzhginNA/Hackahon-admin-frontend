import React from 'react';
import { Block, Box, Paragraph, Flex, SelectField, FlexItem, Grid, Button } from '@qiwi/pijma-desktop';
import { fetchServers, postOs, fetchOs } from '../api/api';

export const ServerAdministration: React.FC = () => {
  const [servers, setServers] = React.useState<any>([]);
  const [osValues, setOSValues] = React.useState<{ id: number }[]>([]);
  const [osOptions, setOSOptions] = React.useState([]);

  React.useEffect(() => {
    // Fetch servers data
    fetchServers().then((res) => {
      setServers(res.servers);
    });

    // Fetch OS data
    fetchOs().then((res) => {
      const osOptions = res.os.map((os: { name: any; id: any; }) => ({
        text: os.name,
        value: { id: os.id }
      }));
      setOSOptions(osOptions);
    });
  }, []);

  const equals = (a: { id: any }, b: { id: any }) => a?.id === b?.id;

  const handleOSChange = (index: number, value: { id: number }) => {
    const newOSValues = [...osValues];
    newOSValues[index] = value;
    setOSValues(newOSValues);
  };

  const handleInstall = async (serverId: number, osId: number) => {
    try {
      const response = await postOs(serverId, osId);
      alert(`Response: ${JSON.stringify(response)}`);
    } catch (error) {
      console.error('Error installing OS:', error);
    }
  };

  return (
    <Flex direction='column' pt={'50px'}>
      {servers.map((server: {
          mac_address: string; id: any; os: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
}, index: number) => (
        <Flex key={server.id} direction='row' align='center' mb={'20px'}>
          <FlexItem width={'40%'} pl={'20px'}>
            <Paragraph size='m'>{server.mac_address} - {server.os}</Paragraph>
          </FlexItem>
          <FlexItem width={'40%'} pr={'20px'}>
            <SelectField
              title="Операционная система"
              value={osValues[index]}
              items={osOptions}
              equals={equals}
              onChange={(value) => handleOSChange(index, value)}
            />
          </FlexItem>
          <FlexItem width={'20%'}>
            <Button type='button' kind='brand' size='normal' text='Install' onClick={() => handleInstall(server.id, osValues[index]?.id)} />
          </FlexItem>
        </Flex>
      ))}
    </Flex>
  );
};
