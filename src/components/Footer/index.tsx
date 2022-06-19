import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import React from 'react';
import { useIntl } from 'umi';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '酱子生鲜团队研发出品',
  });

  return (
    <DefaultFooter
      copyright={`2022 ${defaultMessage}`}
      links={[
        {
          key: 'Open-Cache-Dashboard',
          title: 'Open-Cache-Dashboard',
          href: 'https://github.com/lijunping365/Open-Cache-Dashboard',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/lijunping365/Open-Cache-Dashboard',
          blankTarget: true,
        },
        {
          key: 'Open Cache',
          title: 'Open Cache',
          href: 'https://github.com/lijunping365/Open-Cache',
          blankTarget: true,
        },
      ]}
    />
  );
};
