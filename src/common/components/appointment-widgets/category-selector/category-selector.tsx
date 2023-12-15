import { Box, Grid, styled, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { CategoryImages, CategoryLabels, ServiceCategoriesEnum } from "../../../../enums/service-categories.enum";
import { colors } from "../../../../config/theme/colors";
import Button from "../../../ui/button";
import { EastRounded, WestRounded } from "@mui/icons-material";
import useIsMobile from "../../../../hooks/use-is-mobile.hook";

const Image = styled('img')(
  () => `
    width: 100%;
    border-radius: 12px;
    cursor: pointer;
  `,
);

const ButtonContainer = styled(Box)(
  () => `
    position: absolute;
    display: flex;
    justify-content: end;
    padding: 24px;
    width: 100%;
    bottom: 0;
    left: 0;
  `,
);

const CategoryButton = styled(Button)(
  () => `
    border-radius: 14px;
    opacity: 0.85;
    color: ${colors.primary[70]};
    font-size: 24px;
    font-weight: 700;
    padding: 28px;
  `,
);

const SwitchCountBlock = styled(Box)(
  () => `
    position: relative;
    border-radius: 12px;
    border: 1px solid ${colors.secondary[30]};
    padding: 14px;
    background: ${colors.background.BG_1};
  `,
);

interface Props {
  categoryId: number;
  onCategorySelect: (categoryId: number) => void;
}

const CategorySelector = ({ categoryId, onCategorySelect }: Props): ReactElement => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <Grid container spacing={isMobile ? 0 : 3}>
      {Object.entries(CategoryLabels)
        .slice(0, showAll ? Object.entries(CategoryLabels).length : 7)
        .map(([id, name]) => {
          const itemId = parseInt(id) as ServiceCategoriesEnum;
          return (
            <Grid sx={{ mb: isMobile ? 2 : 0}} key={id} item xs={12} sm={6} md={4} lg={2.3}>
              <Box position="relative" onClick={() => onCategorySelect(itemId)}>
                <Image
                  sx={categoryId === itemId ? { border: `2px solid ${colors.primary[70]}` } : {}}
                  src={CategoryImages[itemId]}
                />
                <ButtonContainer>
                  <CategoryButton variant="contained" color="secondary" fullWidth>
                    {name}
                  </CategoryButton>
                </ButtonContainer>
              </Box>
            </Grid>
          );
        })}
      <Grid item xs={12} sm={6} md={4} lg={2.3}>
        <SwitchCountBlock height="100%">
          <Typography sx={{ m: 2 }} variant="h3" fontSize={35} color={colors.primary[70]}>
            {showAll ? 'Show Less' : 'Show All Services'}
          </Typography>
          <ButtonContainer>
            <Button sx={{ borderRadius: 16 }} variant="contained" onClick={() => setShowAll(!showAll)}>
              {showAll ? <WestRounded /> : <EastRounded />}
            </Button>
          </ButtonContainer>
        </SwitchCountBlock>
      </Grid>
    </Grid>
  );
};

export default CategorySelector;
