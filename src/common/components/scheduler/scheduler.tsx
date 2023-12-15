import React, { ReactElement } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import useWorkingHours from '../../../hooks/use-working-hours.hook';
import { colors } from '../../../config/theme/colors';
import Item from './item';
import { PlayArrowRounded } from '@mui/icons-material';
import { getColorByType, SchedulerItem } from './item/item';
import dayjs from 'dayjs';
import { ItemStatusEnum } from './enums/item-status.enum';
import useIsMobile from "../../../hooks/use-is-mobile.hook";

const StyledBox = styled(Box)(
  ({ theme }) => `
  position: relative;
  display: flex;
  align-items: center;
  padding: 34px 0;
`,
);

const MonthsContainer = styled(Box)(
  ({ theme }) => `
    display: flex;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
      display: none;
    }
`,
);

const CalendarHeader = () => {
  const months = Array.from({ length: 12 }, (_, index) => index);

  return (
    <Box>
      <Box padding={3} textAlign="center">
        <Typography variant="h6">
          {'Monday'} · {'22 July'}
        </Typography>
      </Box>
      <Divider />
      <MonthsContainer>
        {months.map((month) => {
          return (
            <Box key={month} sx={{ p: 2, cursor: 'pointer' }}>
              <Typography>{dayjs().month(month).format('MMMM')}</Typography>
            </Box>
          );
        })}
      </MonthsContainer>
      <Divider />
    </Box>
  );
};

export interface SchedulerItems {
  [key: string]: SchedulerItem;
}

interface Props {
  items: SchedulerItems;
}

const Scheduler = ({ items }: Props): ReactElement | null => {
  const hours = useWorkingHours(60);
  const nextHour = `${(new Date().getHours() + 1).toString().padStart(2, '0')}:00:00`;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Box>
        {hours.map((hour, index) => {
          const currentItemProps = items[hour.slice(0, 2)];

          if (!currentItemProps) {
            return null;
          }

          return <Item key={index} {...currentItemProps} />;
        })}
      </Box>
    );
  }

  return (
    <Box sx={{ background: colors.background.BG_1, pl: 4, pr: 4 }}>
      {hours.map((hour, index) => {
        const isActive = nextHour === hour;
        const currentItemProps = items[hour.slice(0, 2)];
        const color = getColorByType(currentItemProps?.type);

        return (
          <StyledBox key={index}>
            {isActive && <PlayArrowRounded sx={{ position: 'absolute', left: '-28px' }} color="primary" />}
            <Typography
              sx={{ minWidth: 60 }}
              color={
                isActive
                  ? {
                      color: colors.primary[70],
                    }
                  : {
                      color: currentItemProps
                        ? colors[color][currentItemProps.type === ItemStatusEnum.CURRENT ? 70 : 50]
                        : colors.secondary[40],
                    }
              }
              fontWeight={isActive ? 600 : 500}
            >
              {dayjs(hour, 'HH:mm:ss').format('h a')}
            </Typography>
            <Box width="100%">
              <Divider
                sx={
                  isActive
                    ? {
                        background: colors.primary[70],
                        height: 2,
                      }
                    : {
                        background: currentItemProps
                          ? colors[color][currentItemProps.type === ItemStatusEnum.CURRENT ? 70 : 50]
                          : colors.secondary[30],
                      }
                }
              />
            </Box>
            {currentItemProps && <Item {...currentItemProps} />}
          </StyledBox>
        );
      })}
    </Box>
  );
};

export default Scheduler;
