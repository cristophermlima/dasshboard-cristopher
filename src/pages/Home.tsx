import { Link } from 'react-router-dom'

//COMPONENTS
import {
  AvatarsList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
  StyledH2,
  StyledH3,
  StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'

import { useGet } from '@/hooks'

import { currencyConverter, highlightTextConverter } from '@/utils'

import { HighlightsData, StarsData, NewsData, CustomChartProps } from '@/types'

function Home() {
  const {
    data: highlightsData,
    loading: highlightsLoading,
    error: highlightsError,
  } = useGet<HighlightsData[]>('sales/highlights')

  const {
    data: salesMonthData,
    loading: salesMonthLoading,
    error: salesMonthError,
  } = useGet<CustomChartProps>('sales/month')

  const {
    data: salesStarsData,
    loading: salesStarsLoading,
    error: salesStarsError,
  } = useGet<StarsData[]>('sales/stars')

  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
  } = useGet<NewsData[]>('sales/news')

  const {
    data: salesYearData,
    loading: salesYearLoading,
    error: salesYearError,
  } = useGet<CustomChartProps>('sales/year')

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {!highlightsError && highlightsData && (
            <>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!highlightsLoading && (
                    <>
                      <StyledH2 className="mb-1">Total de vendas</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {currencyConverter(highlightsData[0].value)}
                      </StyledH3>
                      <StyledSpan>{highlightsData[0].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!highlightsLoading && (
                    <>
                      <StyledH2 className="mb-1" color="white">
                        Meta do mês
                      </StyledH2>
                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {currencyConverter(highlightsData[1].value)}
                      </StyledH3>
                      <StyledSpan color="white">
                        {highlightTextConverter(highlightsData[1].subtitle)}
                      </StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!highlightsLoading && (
                    <Link to="/leads">
                      <StyledH2 className="mb-1">Leads contactados</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {highlightsData[2].value}
                      </StyledH3>
                      <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                    </Link>
                  )}
                </CardComponent>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={7}>
            {!salesMonthError && salesMonthData && (
              <CardComponent
                className={
                  salesMonthLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesMonthLoading && (
                  <>
                    <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
                    <CustomChart
                      labels={salesMonthData.labels}
                      data={salesMonthData.data}
                      type={salesMonthData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {!salesStarsError && salesStarsData && (
              <CardComponent
                className={
                  salesStarsLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesStarsLoading && (
                  <>
                    <StyledH2 className="mb-1">
                      Maiores vendedores do mês
                    </StyledH2>
                    <AvatarsList
                      listData={salesStarsData.map((star) => ({
                        avatar: '/dnc-avatar.svg',
                        name: star.name,
                        subtitle: currencyConverter(star.value),
                      }))}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            {!newsError && newsData && (
              <CardComponent
                className={
                  newsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
                }
              >
                <StyledH2 className="mb-1">Notícias Relevantes</StyledH2>
                <CustomTable
                  headers={['Título', 'Horário']}
                  rows={newsData.map((news) => [
                    <a
                      className="ellipsis-sm"
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {news.title}
                    </a>,
                    <span>{news.date}</span>,
                  ])}
                />
              </CardComponent>
            )}
          </Grid>

          <Grid item xs={12} md={7}>
            {!salesYearError && salesYearData && (
              <CardComponent
                className={
                  salesYearLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesYearLoading && (
                  <>
                    <StyledH2 className="mb-1">
                      Valor de vendas por mês
                    </StyledH2>
                    <CustomChart
                      labels={salesYearData.labels}
                      data={salesYearData.data}
                      type={salesYearData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
