import * as React from "react";
import { Button, Stack, TextField, Typography, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel, CircularProgress } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import { RowStack } from "~/features/common/RowStack";
import { RegisterCard } from "~/features/register/RegisterCard";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Colors } from "~/enums/Colors";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";

const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre es obligatorio"),
    surname: z.string().min(2, "El apellido es obligatorio"),
    // Documento de identidad (DNI / documento)
    documentoIdentidad: z.string().min(4, "Documento inválido"),
    phone: z
      .string()
      .min(7, "Teléfono inválido")
      .max(20, "Teléfono inválido"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirma la contraseña"),
    role: z.enum(["user", "entrepreneur"], "Debes seleccionar un tipo"),
    // Dirección (country/state/province antes de distrito)
    country: z.string().min(2, "El país es obligatorio"),
    state: z.string().min(2, "El estado es obligatorio"),
    province: z.string().min(2, "La provincia es obligatoria"),
    distrito: z.string().min(2, "El distrito es obligatorio"),
    calle: z.string().min(2, "La calle es obligatoria"),
    codigoPostal: z.string().min(3, "Código postal inválido").max(10, "Código postal inválido"),
    numeroDomicilio: z.string().min(1, "Número inválido"),
    referencia: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    control,
    // handleSubmit, // removido porque no se usa
    formState: { errors },
    setValue,
    watch,
    trigger,
    getValues,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      documentoIdentidad: "",
      country: "",
      state: "",
      province: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
      // defaults for address
      distrito: "",
      calle: "",
      codigoPostal: "",
      numeroDomicilio: "",
      referencia: "",
    },
  });

  const selectedRole = watch("role");

  const steps = ["Datos personales", "Cuenta", "Dirección"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  // roleCode: '2' = emprendedor, '3' = cliente
  const [roleCode, setRoleCode] = React.useState<string>("3");
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [snackSeverity, setSnackSeverity] = React.useState<"success" | "error">("success");

  // --- Nuevos estados para países / estados ---
  type CountryDTO = { id: number; name: string; phoneCode?: string; langCode?: string };
  const [countries, setCountries] = React.useState<CountryDTO[]>([]);
  // FullStateDTO: { id: string, name: string, country: CountryDTO }
  type FullStateDTO = { id: string; name: string; country: CountryDTO };
  const [statesList, setStatesList] = React.useState<FullStateDTO[]>([]);
  // Provincias (FullProvinceDTO: { id: string, name: string, state: FullStateDTO })
  type FullProvinceDTO = { id: string; name: string; state: FullStateDTO };
  const [provincesList, setProvincesList] = React.useState<FullProvinceDTO[]>([]);
  // Distritos (FullDistrictDTO: { id: string, name: string, province: FullProvinceDTO })
  type FullDistrictDTO = { id: string; name: string; province: FullProvinceDTO };
  const [districtsList, setDistrictsList] = React.useState<FullDistrictDTO[]>([]);
  const [loadingCountries, setLoadingCountries] = React.useState(false);
  const [loadingStates, setLoadingStates] = React.useState(false);
  const [loadingProvinces, setLoadingProvinces] = React.useState(false);
  const [loadingDistricts, setLoadingDistricts] = React.useState(false);
  const [selectedCountryId, setSelectedCountryId] = React.useState<string>("");
  const [selectedStateId, setSelectedStateId] = React.useState<string>("");
  const [selectedProvinceId, setSelectedProvinceId] = React.useState<string>("");

  // Obtener países al montar
  React.useEffect(() => {
    let mounted = true;
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await fetch("http://localhost:9095/bcn/api/location/country");
        if (!mounted) return;
        if (!res.ok) {
          const text = await res.text();
          const msg = text || `HTTP ${res.status}`;
          console.error("Error fetching countries:", msg);
          setCountries([]);
          setSnackMessage("No se pudieron cargar los países: " + msg);
          setSnackSeverity("error");
          setSnackOpen(true);
          return;
        }
        const data = await res.json();
        // Asumimos que la API devuelve un array de CountryDTO
        setCountries(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Error al cargar países:", err);
        setSnackMessage("No se pudieron cargar los países");
        setSnackSeverity("error");
        setSnackOpen(true);
      } finally {
        if (mounted) setLoadingCountries(false);
      }
    };

    fetchCountries();
    return () => {
      mounted = false;
    };
  }, []);

  // Cuando cambia el país seleccionado (por id) obtener estados
  React.useEffect(() => {
    let mounted = true;
    const fetchStates = async (countryId: string) => {
      if (!countryId) {
        setStatesList([]);
        return;
      }
      setLoadingStates(true);
      try {
        const res = await fetch(`http://localhost:9095/bcn/api/location/state/country/${countryId}`);
        if (!mounted) return;
        if (!res.ok) {
          const text = await res.text();
          const msg = text || `HTTP ${res.status}`;
          console.error("Error fetching states for country:", msg);
          setStatesList([]);
          setSnackMessage("No se pudieron cargar los estados: " + msg);
          setSnackSeverity("error");
          setSnackOpen(true);
          return;
        }
        const data = await res.json();
        // Asumimos que la API devuelve array de objetos con id y name
        // La API devuelve FullStateDTO[] (id como string, country incluido)
        setStatesList(Array.isArray(data) ? data : []);
        // limpiar valor de state en el formulario
        setValue("state", "");
        // limpiar provincias cuando cambie país
        setProvincesList([]);
        setSelectedStateId("");
        // limpiar distritos también
        setDistrictsList([]);
        setSelectedProvinceId("");
      } catch (err: any) {
        console.error("Error al cargar estados:", err);
        setSnackMessage("No se pudieron cargar los estados para el país seleccionado");
        setSnackSeverity("error");
        setSnackOpen(true);
      } finally {
        if (mounted) setLoadingStates(false);
      }
    };

    if (selectedCountryId) fetchStates(selectedCountryId);
    else setStatesList([]);

    return () => {
      mounted = false;
    };
  }, [selectedCountryId, setValue]);

  // Cuando cambia el estado seleccionado (por id) obtener provincias
  React.useEffect(() => {
    let mounted = true;
    const fetchProvinces = async (stateId: string) => {
      if (!stateId) {
        setProvincesList([]);
        return;
      }
      setLoadingProvinces(true);
      try {
        const res = await fetch(`http://localhost:9095/bcn/api/location/province/state/${stateId}`);
        if (!mounted) return;
        if (!res.ok) {
          const text = await res.text();
          const msg = text || `HTTP ${res.status}`;
          console.error("Error fetching provinces for state:", msg);
          setProvincesList([]);
          setSnackMessage("No se pudieron cargar las provincias: " + msg);
          setSnackSeverity("error");
          setSnackOpen(true);
          return;
        }
        const data = await res.json();
        // Asumimos que la API devuelve FullProvinceDTO[]
        setProvincesList(Array.isArray(data) ? data : []);
        // limpiar valor de province en el formulario
        setValue("province", "");
        // limpiar distritos al obtener nuevas provincias
        setDistrictsList([]);
        setSelectedProvinceId("");
      } catch (err: any) {
        console.error("Error al cargar provincias:", err);
        setSnackMessage("No se pudieron cargar las provincias para el estado seleccionado");
        setSnackSeverity("error");
        setSnackOpen(true);
      } finally {
        if (mounted) setLoadingProvinces(false);
      }
    };

    if (selectedStateId) fetchProvinces(selectedStateId);
    else setProvincesList([]);

    return () => {
      mounted = false;
    };
  }, [selectedStateId, setValue]);

  // Cuando cambia la provincia seleccionada (por id) obtener distritos
  React.useEffect(() => {
    let mounted = true;
    const fetchDistricts = async (provinceId: string) => {
      if (!provinceId) {
        setDistrictsList([]);
        return;
      }
      setLoadingDistricts(true);
      try {
        const res = await fetch(`http://localhost:9095/bcn/api/location/district/province/${provinceId}`);
        if (!mounted) return;
        if (!res.ok) {
          const text = await res.text();
          const msg = text || `HTTP ${res.status}`;
          console.error("Error fetching districts for province:", msg);
          setDistrictsList([]);
          setSnackMessage("No se pudieron cargar los distritos: " + msg);
          setSnackSeverity("error");
          setSnackOpen(true);
          return;
        }
        const data = await res.json();
        // Asumimos que la API devuelve FullDistrictDTO[]
        setDistrictsList(Array.isArray(data) ? data : []);
        // limpiar valor de distrito en el formulario
        setValue("distrito", "");
      } catch (err: any) {
        console.error("Error al cargar distritos:", err);
        setSnackMessage("No se pudieron cargar los distritos para la provincia seleccionada");
        setSnackSeverity("error");
        setSnackOpen(true);
      } finally {
        if (mounted) setLoadingDistricts(false);
      }
    };

    if (selectedProvinceId) fetchDistricts(selectedProvinceId);
    else setDistrictsList([]);

    return () => {
      mounted = false;
    };
  }, [selectedProvinceId, setValue]);

  const handleRegister = async (data: RegisterFormData) => {
    setSubmitting(true);
    try {
      // No enviar confirmPassword al backend
      const { confirmPassword, ...payload } = data as any;
      // Añadir roleCode al payload para backend si lo requiere
      (payload as any).roleCode = roleCode;
      const res = await fetch("http://localhost:9095/bcn/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Intentar parsear JSON con { message } del backend, sino fallback a texto
        let errMsg = `HTTP ${res.status}`;
        try {
          const json = await res.json();
          if (json && typeof json === 'object') {
            if (json.message) errMsg = String(json.message);
            else errMsg = JSON.stringify(json);
          }
        } catch (e) {
          try {
            const text = await res.text();
            if (text) errMsg = text;
          } catch (e) {
            // ignore
          }
        }
        setSnackMessage(errMsg || `HTTP ${res.status}`);
        setSnackSeverity("error");
        setSnackOpen(true);
        setSubmitting(false);
        return;
      }


      try {
        const userPayload = {
          documentId: payload.documentoIdentidad,
          name: payload.name,
          lastname: payload.surname,
          phone: payload.phone,
          email: payload.email,
          roleId: Number(roleCode),
          address: {
            country: payload.country,
            state: payload.state,
            province: payload.province,
            districtId: payload.distrito,
            street: payload.calle,
            postalCode: payload.codigoPostal,
            number: payload.numeroDomicilio,
            reference: payload.referencia || "",
          },
        };

        const headers: Record<string, string> = { "Content-Type": "application/json" };
        // Incluir Authorization si existe token
        if ((auth as any)?.user?.access_token) {
          headers["Authorization"] = `Bearer ${(auth as any).user.access_token}`;
        }

        const resUser = await fetch("http://localhost:9095/bcn/api/user", {
          method: "POST",
          headers,
          body: JSON.stringify(userPayload),
        });

        if (!resUser.ok) {

          let userErr = `HTTP ${resUser.status}`;
          try {
            const j = await resUser.json();
            userErr = j?.message || JSON.stringify(j);
          } catch (e) {
            try {
              const t = await resUser.text();
              if (t) userErr = t;
            } catch (e) {}
          }
          console.warn("POST /bcn/api/user falló:", userErr);
        }
      } catch (err) {
        console.error("Error al enviar /bcn/api/user:", err);
      }

      // Mostrar mensaje de éxito
      setSnackMessage("Ya estás registrado");
      setSnackSeverity("success");
      setSnackOpen(true);
      // Dejar que el llamador decida la navegación; retornar true para indicar éxito
      return true;
    } catch (error: any) {
      console.error("Error en handleRegister:", error);
      let message = "Error al registrar usuario";
      // Detectar problemas de red / CORS
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        message = "Sin conexión a Internet. Revisa tu conexión.";
      } else if (error instanceof TypeError && /failed to fetch/i.test(error.message)) {
        message =
          "No se pudo conectar con el servidor en http://localhost:9095. Verifica que el backend esté corriendo y que CORS permita peticiones desde la app.";
      } else if (error?.message) {
        message = error.message;
      }

      setSnackMessage(message);
      setSnackSeverity("error");
      setSnackOpen(true);
      return false;
    } finally {
      setSubmitting(false);
    }
  };


  const onNext = async () => {
    if (activeStep === 0) {
      const valid = await trigger(["name", "surname", "documentoIdentidad", "phone", "email", "password", "confirmPassword"]);
      if (!valid) return;
      setActiveStep(1);
    } else if (activeStep === 1) {

      const valid = await trigger(["role"]);
      if (!valid) return;
      setActiveStep(2);
    } else {
      // último paso: validar todos los campos de dirección y enviar
      const valid = await trigger(["country", "state", "province", "distrito", "calle", "codigoPostal", "numeroDomicilio"]);
      if (!valid) return;

      try {
        // Obtener todos los valores y llamar directamente a handleRegister
        const values = getValues() as RegisterFormData;
        const success = await handleRegister(values);
        if (success) {
          // esperar un instante para que el usuario vea el snack
          setTimeout(() => navigate("/"), 800);
        }
      } catch (e) {
        console.error("Error en submit:", e);
      }
    }
  };

  const onBack = () => setActiveStep((s) => Math.max(0, s - 1));

  const handleCardSelect = (role: "user" | "entrepreneur") => {
    setValue("role", role);
    setRoleCode(role === "entrepreneur" ? "2" : "3");
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 760 }}>
        <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
          Regístrate
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 3 }}>
          {activeStep === 0 && (
            <Box component="form" noValidate>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <Box>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nombre"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="surname"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Apellido"
                        fullWidth
                        error={!!errors.surname}
                        helperText={errors.surname?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="documentoIdentidad"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Documento de identidad"
                        fullWidth
                        error={!!errors.documentoIdentidad}
                        helperText={errors.documentoIdentidad?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Teléfono"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Correo electrónico"
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Contraseña"
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Confirmar contraseña"
                        type="password"
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Box component="form" noValidate>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Selecciona tipo de cuenta
                  </Typography>

                  <RowStack sx={{ gap: 2, flexWrap: "wrap" }}>
                    <RegisterCard type="user" checked={selectedRole === "user"} onChange={() => handleCardSelect("user")} />
                    <RegisterCard type="entrepreneur" checked={selectedRole === "entrepreneur"} onChange={() => handleCardSelect("entrepreneur")} />
                  </RowStack>

                  {errors.role && (
                    <Typography variant="body2" color="error">
                      {errors.role.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box component="form" noValidate>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                {/* País (ahora Select que carga desde la API) */}
                <Box>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="country-label">País</InputLabel>
                        <Select
                          labelId="country-label"
                          label="País"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const val = e.target.value as string;
                            // guardar el nombre en el form (schema sigue esperando string)
                            field.onChange(val);
                            // buscar id del país y guardarlo en estado local para solicitar estados
                            const found = countries.find((c) => c.name === val);
                            setSelectedCountryId(found?.id?.toString() || "");
                          }}
                          error={!!errors.country}
                        >
                          {loadingCountries && (
                            <MenuItem value="" disabled>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <CircularProgress size={16} /> Cargando...
                              </Box>
                            </MenuItem>
                          )}

                          {!loadingCountries && countries.length === 0 && (
                            <MenuItem value="" disabled>No hay países</MenuItem>
                          )}

                          {countries.map((c) => (
                            <MenuItem key={c.id} value={c.name}>
                              {c.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.country && (
                          <Typography variant="body2" color="error">
                            {errors.country.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>

                {/* Estado/Región (cargado según país) */}
                <Box>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="state-label">Estado</InputLabel>
                        <Select
                          labelId="state-label"
                          label="Estado"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const val = e.target.value as string;
                            field.onChange(val);
                            const found = statesList.find((st) => st.name === val);
                            setSelectedStateId(found?.id || "");
                          }}
                          error={!!errors.state}
                        >
                          {loadingStates && (
                            <MenuItem value="" disabled>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <CircularProgress size={16} /> Cargando...
                              </Box>
                            </MenuItem>
                          )}

                          {!loadingStates && statesList.length === 0 && (
                            <MenuItem value="" disabled>Selecciona un país primero</MenuItem>
                          )}

                          {statesList.map((s) => (
                            <MenuItem key={s.id} value={s.name}>
                              {s.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.state && (
                          <Typography variant="body2" color="error">
                            {errors.state.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>

                {/* Provincia (sigue siendo campo de texto libre) */}
                <Box>
                  <Controller
                    name="province"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="province-label">Provincia</InputLabel>
                        <Select
                          labelId="province-label"
                          label="Provincia"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const val = e.target.value as string;
                            field.onChange(val);
                            const found = provincesList.find((p) => p.name === val);
                            setSelectedProvinceId(found?.id || "");
                          }}
                          error={!!errors.province}
                        >
                          {loadingProvinces && (
                            <MenuItem value="" disabled>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <CircularProgress size={16} /> Cargando...
                              </Box>
                            </MenuItem>
                          )}

                          {!loadingProvinces && provincesList.length === 0 && (
                            <MenuItem value="" disabled>Selecciona un estado primero</MenuItem>
                          )}

                          {provincesList.map((p) => (
                            <MenuItem key={p.id} value={p.name}>
                              {p.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.province && (
                          <Typography variant="body2" color="error">
                            {errors.province.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="distrito"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="district-label">Distrito</InputLabel>
                        <Select
                          labelId="district-label"
                          label="Distrito"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          error={!!errors.distrito}
                        >
                          {loadingDistricts && (
                            <MenuItem value="" disabled>
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <CircularProgress size={16} /> Cargando...
                              </Box>
                            </MenuItem>
                          )}

                          {!loadingDistricts && districtsList.length === 0 && (
                            <MenuItem value="" disabled>Selecciona una provincia primero</MenuItem>
                          )}

                          {districtsList.map((d) => (
                            <MenuItem key={d.id} value={d.name}>
                              {d.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.distrito && (
                          <Typography variant="body2" color="error">
                            {errors.distrito.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="calle"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Calle" fullWidth error={!!errors.calle} helperText={errors.calle?.message} />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="codigoPostal"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Código postal" fullWidth error={!!errors.codigoPostal} helperText={errors.codigoPostal?.message} />
                    )}
                  />
                </Box>

                <Box>
                  <Controller
                    name="numeroDomicilio"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Número de domicilio" fullWidth error={!!errors.numeroDomicilio} helperText={errors.numeroDomicilio?.message} />
                    )}
                  />
                </Box>

                <Box sx={{ gridColumn: "1 / -1" }}>
                  <Controller
                    name="referencia"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Referencia (opcional)" fullWidth error={!!errors.referencia} helperText={errors.referencia?.message} />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={onBack} disabled={activeStep === 0 || submitting}>
              Atrás
            </Button>

            <Button variant="contained" onClick={onNext} disabled={submitting} sx={{ backgroundColor: Colors.BLACK, color: Colors.WHITE }}>
              {activeStep === steps.length - 1 ? "Registrar" : "Siguiente"}
            </Button>

            <Button variant="text" onClick={() => auth.signinRedirect()} sx={{ marginLeft: "auto" }}>
              Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
