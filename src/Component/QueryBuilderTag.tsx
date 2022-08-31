import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';
import { getTagColorsFromName, stylesFactory, useTheme, IconButton } from '@grafana/ui';
import React, { ComponentType } from 'react';

type QueryBuilderTagProps = {
  name: string;
  value: string;
  onRemove: (name: string) => void;
};
const getStyles = stylesFactory(({ theme, name }: { theme: GrafanaTheme; name: string }) => {
  const { color, borderColor } = getTagColorsFromName(name);
  const height = theme.spacing.formInputHeight - 8;

  return {
    itemStyle: css`
      display: flex;
      align-items: center;
      height: ${height}px;
      line-height: ${height - 2}px;
      background-color: ${color};
      color: ${theme.palette.white};
      border: 1px solid ${borderColor};
      border-radius: 3px;
      padding: 0 ${theme.spacing.xs};
      margin-right: 3px;
      white-space: nowrap;
      text-shadow: none;
      font-weight: 500;
      font-size: ${theme.typography.size.sm};
    `,

    nameStyle: css`
      margin-right: 3px;
    `,

    buttonStyles: css`
      margin: 0;
      &:hover::before {
        display: none;
      }
    `,
  };
});
export const QueryBuilderTag: ComponentType<QueryBuilderTagProps> = ({ name, value, onRemove }) => {
  const theme = useTheme();
  const styles = getStyles({ theme, name });

  return (
    <div className={styles.itemStyle}>
      <span className={styles.nameStyle}>
        {name}={value}
      </span>
      <IconButton
        name="times"
        size="lg"
        ariaLabel={`Remove ${name}`}
        onClick={() => onRemove(name)}
        type="button"
        className={styles.buttonStyles}
      />
    </div>
  );
};
