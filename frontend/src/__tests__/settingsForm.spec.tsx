import React from 'react';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import SettingsForm from '../features/navbar/SettingsForm';
import { renderWithProviders } from '../test-utils';
import { cfg } from '../mocks/dummy-data';
import { server } from '../setupTests';

describe('ConfigsPage', () => {
  it('render one TextField for each config variable', async () => {
    renderWithProviders(<SettingsForm />);

    expect(await screen.findByText('DB_PATH')).toBeTruthy();
    expect(screen.getByText('DB_TABLE_NAME')).toBeTruthy();
    expect(screen.getByText('DB_CONTENT_ATTRIBUTE_NAME')).toBeTruthy();
    expect(screen.getByText('DATA_DIR')).toBeTruthy();
  });

  it('fetch current values from backend and display them', async () => {
    renderWithProviders(<SettingsForm />);

    // test if progressbar is displayed when page is being loaded
    screen.getByRole('progressbar');
    // wait page to load, then test if one of the fields is displayed
    await screen.findByText('DB_PATH');

    const dbPathInputField = screen.getByLabelText('DB_PATH') as HTMLInputElement;
    const dbTableNameInputField = screen.getByLabelText('DB_TABLE_NAME') as HTMLInputElement;
    const dbContentInputField = screen.getByLabelText('DB_CONTENT_ATTRIBUTE_NAME') as HTMLInputElement;
    const dataDirInputField = screen.getByLabelText('DATA_DIR') as HTMLInputElement;

    expect(dbPathInputField.value).toBe(cfg.db_path);
    expect(dbTableNameInputField.value).toBe(cfg.db_table_name);
    expect(dbContentInputField.value).toBe(cfg.db_content_attribute_name);
    expect(dataDirInputField.value).toBe(cfg.data_dir);
  });

  it('if data cannot be fetched, then display error', async () => {
    // force msw to return error response
    server.use(
      rest.get(
        'http://localhost/api/v1/configs',
        (req, res, ctx) => res(ctx.status(403)),
      ),
    );
    renderWithProviders(<SettingsForm />);
    await screen.findByRole('contentinfo');
  });
});
