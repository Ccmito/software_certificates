import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 10, label: 'ภายใน ทอ.', color: '#FF0000' },
  { id: 1, value: 10, label: 'ภายในปรเทศ', color: '#00FF00' },
  { id: 2, value: 10, label: 'ภายนอกประเทศ', color: '#0000FF' },
];

export default function PieActiveArc() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft:'150px'
      }}
    >
      <Box
        sx={{
          width: '60%',
          '& text, & rect': {
            display: 'none',
          },
        }}
      >
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 50, additionalRadius: -100, color: 'gray' },
              label: null,
            },
          ]}
          height={300}
          width={300}
        />
      </Box>
      <Box sx={{ width: '100%', paddingLeft: '150px', }}>
        <Typography
          sx={{
            fontSize: { xs: '12px', sm: '16px', md: '16px', lg: '20px' },
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontFamily: 'Inter',
          }}
          gutterBottom
        >
          ประเภทใบรับรอง
        </Typography>
        {data.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <Box
              sx={{
                width: { xs: '12px', sm: '12px', md: '15px', lg: '20px' },
                height: { xs: '12px', sm: '12px', md: '15px', lg: '20px' },
                backgroundColor: item.color,
                marginRight: '10px',
                borderRadius: '50%',
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '10px', sm: '16px', md: '16px', lg: '15px' },
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontStyle: 'Inter'
              }}
            >
              {item.label} : {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
