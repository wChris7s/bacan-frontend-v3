import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { ShoppingBag, Store, TrendingUp } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";

export default function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Box sx={{ bgcolor: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          color: "white",
          py: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                mb: 2,
                letterSpacing: "-0.03em",
              }}
            >
              Welcome to Bacan
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                mb: 5,
                opacity: 0.9,
                fontWeight: 400,
              }}
            >
              Where entrepreneurs meet customers in a modern marketplace
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {user ? (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      px: 5,
                      py: 1.5,
                      fontSize: "1.1rem",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                    onClick={() => navigate("/products")}
                  >
                    Browse Products
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      px: 5,
                      py: 1.5,
                      fontSize: "1.1rem",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                    onClick={() =>
                      navigate(
                        user.role === "ENTREPRENEUR" ? "/dashboard" : "/cart"
                      )
                    }
                  >
                    {user.role === "ENTREPRENEUR"
                      ? "Go to Dashboard"
                      : "View Cart"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      px: 5,
                      py: 1.5,
                      fontSize: "1.1rem",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      px: 5,
                      py: 1.5,
                      fontSize: "1.1rem",
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                    onClick={() => navigate("/products")}
                  >
                    Browse Products
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Why Choose Bacan?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: 600,
              mx: "auto",
            }}
          >
            The perfect platform for entrepreneurs and shoppers
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                p: 4,
                transition: "all 0.3s ease",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <Store sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                For Entrepreneurs
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Create your own venture, manage products, and reach customers
                easily with our intuitive platform.
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                p: 4,
                transition: "all 0.3s ease",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <ShoppingBag sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                For Customers
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Discover unique products from local entrepreneurs, shop easily,
                and support small businesses.
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: "100%",
                textAlign: "center",
                p: 4,
                transition: "all 0.3s ease",
                border: "1px solid #f0f0f0",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <TrendingUp sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Easy to Use
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Simple interface, powerful features. Start selling or shopping
                in minutes with no hassle.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Join thousands of entrepreneurs and customers on Bacan
          </Typography>
          {!user && (
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
              }}
              onClick={() => navigate("/register")}
            >
              Create Your Account Now
            </Button>
          )}
        </Container>
      </Box>
    </Box>
  );
}
