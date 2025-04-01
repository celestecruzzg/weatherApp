import React, { useEffect, useState } from 'react';
import { sensorService, ParcelaEliminada } from '../../services/api';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';

// Estilo personalizado para las celdas de la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  borderBottom: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[100],
  padding: '12px 16px',
}));

// Estilo para las filas de la tabla
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const ParcelasEliminadas: React.FC = () => {
  const [parcelasEliminadas, setParcelasEliminadas] = useState<ParcelaEliminada[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadParcelasEliminadas = async () => {
      try {
        const response = await sensorService.getParcelasEliminadas();
        if (response.success) {
          setParcelasEliminadas(response.data);
        } else {
          setError(response.message || 'Error al cargar parcelas eliminadas');
          setParcelasEliminadas(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar parcelas eliminadas');
        setParcelasEliminadas(null);
      } finally {
        setLoading(false);
      }
    };

    loadParcelasEliminadas();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!parcelasEliminadas || parcelasEliminadas.length === 0) {
    return <Alert severity="info">No hay parcelas eliminadas</Alert>;
  }

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Ubicación</StyledTableCell>
                <StyledTableCell>Responsable</StyledTableCell>
                <StyledTableCell>Tipo de Cultivo</StyledTableCell>
                <StyledTableCell>Último Riego</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parcelasEliminadas.map((parcela) => (
                <StyledTableRow key={parcela.id}>
                  <TableCell>{parcela.nombre}</TableCell>
                  <TableCell>{parcela.ubicacion}</TableCell>
                  <TableCell>{parcela.responsable}</TableCell>
                  <TableCell>{parcela.tipo_cultivo}</TableCell>
                  <TableCell>{parcela.ultimo_riego}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ParcelasEliminadas;
