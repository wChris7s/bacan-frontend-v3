import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  keyframes,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Bolt,
  LocalShipping,
  Security,
  ShoppingBag,
  Store,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export default function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const features = [
    {
      icon: <Store sx={{ fontSize: 36, color: "white" }} />,
      title: "For Entrepreneurs",
      description:
        "Launch your venture, curate your products, and connect with customers through our powerful platform.",
      delay: "0s",
    },
    {
      icon: <ShoppingBag sx={{ fontSize: 36, color: "white" }} />,
      title: "For Customers",
      description:
        "Discover unique products from passionate entrepreneurs and support small businesses worldwide.",
      delay: "0.1s",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 36, color: "white" }} />,
      title: "Easy to Scale",
      description:
        "From your first sale to your millionth - our platform grows with your business ambitions.",
      delay: "0.2s",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Sellers" },
    { value: "50K+", label: "Products" },
    { value: "99%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <Box sx={{ bgcolor: "white", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #000000 0%, #0a0a0a 40%, #141414 100%)",
          color: "white",
          py: { xs: 12, md: 18 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            animation: `${float} 8s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
            animation: `${float} 10s ease-in-out infinite reverse`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 60%)",
            animation: `${pulse} 4s ease-in-out infinite`,
          }}
        />

        {/* Grid pattern overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
            <Typography
              sx={{
                display: "inline-block",
                px: 3,
                py: 1,
                mb: 4,
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                bgcolor: "rgba(255,255,255,0.05)",
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              ✨ The Future of Commerce
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4rem", md: "5.5rem" },
                fontWeight: 900,
                mb: 3,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                animation: `${fadeInUp} 0.8s ease-out 0.1s both`,
              }}
            >
              Welcome to{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #fff 0%, #888 50%, #fff 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: `${shimmer} 3s linear infinite`,
                }}
              >
                Bacan
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                mb: 6,
                opacity: 0.75,
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }}
            >
              Where visionary entrepreneurs meet discerning customers in a
              modern marketplace experience
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: `${fadeInUp} 0.8s ease-out 0.3s both`,
              }}
            >
              {user ? (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      boxShadow: "0px 8px 30px rgba(255,255,255,0.2)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                        transform: "translateY(-4px)",
                        boxShadow: "0px 16px 40px rgba(255,255,255,0.25)",
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
                      borderColor: "rgba(255,255,255,0.4)",
                      borderWidth: 2,
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: "white",
                        borderWidth: 2,
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-4px)",
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
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "white",
                      color: "black",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      boxShadow: "0px 8px 30px rgba(255,255,255,0.2)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                        transform: "translateY(-4px)",
                        boxShadow: "0px 16px 40px rgba(255,255,255,0.25)",
                      },
                    }}
                    onClick={() => navigate("/register")}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "rgba(255,255,255,0.4)",
                      borderWidth: 2,
                      color: "white",
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 3,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: "white",
                        borderWidth: 2,
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-4px)",
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

          {/* Stats Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 4, md: 8 },
              mt: 10,
              flexWrap: "wrap",
              animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    opacity: 0.6,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.5,
              mb: 2,
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "text.secondary",
              bgcolor: "rgba(0,0,0,0.05)",
              borderRadius: 2,
            }}
          >
            Why Bacan
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 800,
              mb: 2,
              letterSpacing: "-0.03em",
            }}
          >
            Built for Success
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Everything you need to launch, grow, and scale your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 5,
                  bgcolor: "white",
                  border: "1px solid",
                  borderColor: "rgba(0,0,0,0.08)",
                  borderRadius: 4,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background:
                      "linear-gradient(90deg, #000 0%, #333 50%, #000 100%)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0px 24px 48px rgba(0, 0, 0, 0.12)",
                    "&::before": {
                      transform: "scaleX(1)",
                    },
                    "& .feature-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    bgcolor: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 2, letterSpacing: "-0.02em" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.8, fontSize: "1rem" }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: "#fafafa", py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  mb: 2,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  bgcolor: "rgba(0,0,0,0.05)",
                  borderRadius: 2,
                }}
              >
                Benefits
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  letterSpacing: "-0.03em",
                  fontSize: { xs: "2rem", md: "2.75rem" },
                }}
              >
                Everything you need to succeed
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                From secure payments to fast shipping, we've got all the tools
                you need to run a successful online business.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[
                  {
                    icon: <Bolt />,
                    title: "Lightning Fast",
                    desc: "Quick setup and instant payouts",
                  },
                  {
                    icon: <Security />,
                    title: "Secure & Safe",
                    desc: "Enterprise-grade security for all transactions",
                  },
                  {
                    icon: <LocalShipping />,
                    title: "Global Reach",
                    desc: "Ship to customers worldwide",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2.5,
                      p: 2.5,
                      bgcolor: "white",
                      borderRadius: 3,
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(8px)",
                        boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: "0.95rem" }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: -20,
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 50%)",
                    borderRadius: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    bgcolor: "black",
                    borderRadius: 5,
                    p: 6,
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0px 32px 64px rgba(0,0,0,0.2)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "5rem",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      mb: 2,
                    }}
                  >
                    0%
                  </Typography>
                  <Typography sx={{ fontSize: "1.25rem", opacity: 0.9, mb: 1 }}>
                    Commission Fee
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", opacity: 0.6 }}>
                    Keep 100% of your earnings
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background:
            "linear-gradient(160deg, #000000 0%, #0a0a0a 40%, #141414 100%)",
          py: { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150%",
            height: "150%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 50%)",
          }}
        />

        <Container
          maxWidth="md"
          sx={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 800,
              mb: 3,
              color: "white",
              letterSpacing: "-0.03em",
            }}
          >
            Ready to Launch?
          </Typography>
          <Typography
            sx={{
              mb: 5,
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              color: "rgba(255,255,255,0.7)",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Join thousands of entrepreneurs building their dreams on Bacan
          </Typography>
          {!user && (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "white",
                color: "black",
                px: 6,
                py: 2,
                fontSize: "1.15rem",
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: "0px 8px 30px rgba(255,255,255,0.2)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0px 16px 40px rgba(255,255,255,0.25)",
                },
              }}
              onClick={() => navigate("/register")}
            >
              Create Your Account
            </Button>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#000", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              sx={{ color: "white", fontWeight: 800, fontSize: "1.25rem" }}
            >
              BACAN
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}
            >
              © 2025 Bacan. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}