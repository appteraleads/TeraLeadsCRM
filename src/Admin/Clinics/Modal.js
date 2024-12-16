/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import imageCompression from "browser-image-compression";
import { PiCheckBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { BiUpload } from "react-icons/bi";
import TabPane from "antd/es/tabs/TabPane";
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LinkOutlined,
} from "@ant-design/icons";
import {
  parsePhoneNumberFromString,
  parsePhoneNumber,
} from "libphonenumber-js";
import dayjs from "dayjs";
import { RiZzzFill } from "react-icons/ri";
import axios from "axios";
import { decryptPassword, parsePhone } from "../../Common/CommonFuntions";
const { Option } = Select;

export const CreateNewClinicModal = ({
  iscrearteNewClinicModalVisible,
  setiscrearteNewClinicModalVisible,
  openNotificationWithIcon,
  buttonLoader,
  setbuttonLoader,
  getAllClinicDetails,
}) => {
  const [crearteNewClinicModalForm] = Form.useForm();
  const [services, setservices] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [websiteList, setwebsiteList] = useState([]);
  const [clinicLogo, setclinicLogo] = useState();
  const [clinicFavicon, setclinicFavicon] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountryPhoneNumber, setselectedCountryPhoneNumber] =
    useState();
  const [
    selectedCountryPhoneNumberDialer,
    setselectedCountryPhoneNumberDialer,
  ] = useState();

  const [mondayFrom, setMondayFrom] = useState();
  const [mondayTo, setMondayTo] = useState();
  const [mondayClosed, setMondayClosed] = useState(true);

  const [tuesdayFrom, setTuesdayFrom] = useState();
  const [tuesdayTo, setTuesdayTo] = useState();
  const [tuesdayClosed, setTuesdayClosed] = useState(true);

  const [wednesdayFrom, setWednesdayFrom] = useState();
  const [wednesdayTo, setWednesdayTo] = useState();
  const [wednesdayClosed, setWednesdayClosed] = useState(true);

  const [thursdayFrom, setThursdayFrom] = useState();
  const [thursdayTo, setThursdayTo] = useState();
  const [thursdayClosed, setThursdayClosed] = useState(true);

  const [fridayFrom, setFridayFrom] = useState();
  const [fridayTo, setFridayTo] = useState();
  const [fridayClosed, setFridayClosed] = useState(true);

  const [saturdayFrom, setSaturdayFrom] = useState();
  const [saturdayTo, setSaturdayTo] = useState();
  const [saturdayClosed, setSaturdayClosed] = useState(false);

  const [sundayFrom, setSundayFrom] = useState();
  const [sundayTo, setSundayTo] = useState();
  const [sundayClosed, setSundayClosed] = useState(false);

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const serviceList = [
    "Full Arch",
    "Dental Implants",
    "General Dentistry",
    "Othodontics",
    "Cosmetic Dentistry",
    "Oral Surgery",
    "Pediatric Dentistry",
  ];

  const clinicSizeOption = [
    {
      value: "1-5 dentists",
      lable: "1-5 dentists",
    },
    {
      value: "6-10 dentists",
      lable: "6-10 dentists",
    },
    {
      value: "11-15 dentists",
      lable: "11-15 dentists",
    },
    {
      value: "16-20 dentists",
      lable: "16-20 dentists",
    },
    {
      value: "21-25 dentists",
      lable: "21-25 dentists",
    },
    {
      value: "25+ dentists",
      lable: "25+ dentists",
    },
  ];

  const patientsAveragePerWeekOption = [
    {
      value: "Less Than 50",
      lable: "Less Than 50",
    },
    {
      value: "51-100",
      lable: "51-100",
    },
    {
      value: "101-150",
      lable: "101-150",
    },
    {
      value: "More Than 150",
      lable: "More Than 150",
    },
  ];

  const handleValidation = (dialCode, phoneNumber) => {
    const fullNumber = `${dialCode}${phoneNumber}`;
    const phoneNumberObject = parsePhoneNumberFromString(
      fullNumber,
      selectedCountryPhoneNumber?.code
    );

    if (phoneNumberObject && !phoneNumberObject?.isValid()) {
      crearteNewClinicModalForm.resetFields(["clinic_phone_number"]);
      message.error("Please enter a valid clinic phone number.");
    }
    return phoneNumberObject?.isValid();
  };

  const handleValidationDialer = (dialCode, phoneNumber) => {
    const fullNumber = `${dialCode}${phoneNumber}`;
    const phoneNumberObject = parsePhoneNumberFromString(
      fullNumber,
      selectedCountryPhoneNumberDialer?.code
    );

    if (phoneNumberObject && !phoneNumberObject.isValid()) {
      crearteNewClinicModalForm.resetFields(["clinic_phone_number"]);
      message.error("Please enter a valid dialer phone number.");
    }
    return phoneNumberObject?.isValid();
  };

  const addServices = (val) => {
    if (services.includes(val.trim())) {
      setservices(services.filter((service) => service !== val));
    } else {
      setservices([...services, val]);
    }
  };

  const CustomButton = ({ service, services, onClick }) => {
    const isSelected = services.includes(service);

    return (
      <Button
        className="custom-btn"
        style={{
          color: isSelected ? "#3900DB" : "",
          borderColor: isSelected ? "#3900DB" : "",
          background: isSelected ? "#ECEEFF" : "",
        }}
        onClick={onClick}
      >
        {isSelected ? <PiCheckBold /> : ""}
        {service}
      </Button>
    );
  };

  const isValidUrl = (value) => {
    try {
      // Attempt to create a new URL object
      new URL(value);
      return true; // If no error is thrown, the URL is valid
    } catch (_) {
      return false; // If an error is thrown, the URL is invalid
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      // Example usage
      if (isValidUrl(currentValue.trim())) {
        if (currentValue.trim() && !websiteList.includes(currentValue.trim())) {
          setwebsiteList([...websiteList, currentValue.trim()]);
        }
        setCurrentValue();
      } else {
        openNotificationWithIcon("error", "Clinic", "Please enter valid URL");
      }
    }
  };

  const getLogoUrl = (url) => {
    const domain = new URL(url)?.hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  const handleRemoveValue = (removedValue) => {
    setwebsiteList(websiteList.filter((v) => v !== removedValue));
  };

  const handleClinicLogoChange = async (file) => {
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    try {
      let fileToUpload = file;

      if (file.size > maxSizeInBytes) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        fileToUpload = await imageCompression(file, options);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setclinicLogo(e.target.result);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Image compression failed. Please try again with a smaller file.");
    }
  };

  const handleClinicLogoDelete = () => {
    setclinicLogo();
  };

  const handleClinicFaviconChange = async (file) => {
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    try {
      let fileToUpload = file;

      if (file.size > maxSizeInBytes) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        fileToUpload = await imageCompression(file, options);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setclinicFavicon(e.target.result);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Image compression failed. Please try again with a smaller file.");
    }
  };

  const handleFaviconDelete = () => {
    setclinicFavicon();
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          dialCode: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
          flag: country.flags.svg,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (value) => {
    const [code, dialCode] = value.split("|");
    setselectedCountryPhoneNumber({ code, dialCode });
  };

  const handleCountryChangeDialer = (value) => {
    const [code, dialCode] = value.split("|");
    setselectedCountryPhoneNumberDialer({ code, dialCode });
  };

  const handleCreateNewClinic = async (values) => {
    // setbuttonLoader(true);
    const completePhoneNumber = `${selectedCountryPhoneNumber?.dialCode}${values?.clinic_phone_number}`;
    const completePhoneNumberDialer = `${selectedCountryPhoneNumberDialer?.dialCode}${values?.clinic_dialer}`;
    if (!selectedCountryPhoneNumber?.dialCode) {
      message.error("Please select country code for clinic phone number");
      setbuttonLoader(false);
      return;
    }

   
    const valid = await handleValidation(
      selectedCountryPhoneNumber?.dialCode,
      values?.clinic_phone_number
    );
    if (!valid) {
      console.log("Phone number is invalid. Terminating function.");
      setbuttonLoader(false);
      return;
    }

    if (!selectedCountryPhoneNumberDialer?.dialCode) {
      message.error("Please select country code for dialer phone number");
      setbuttonLoader(false);
      return;
    }
    const validdialer = await handleValidationDialer(
      selectedCountryPhoneNumberDialer?.dialCode,
      values?.clinic_dialer
    );
    if (!validdialer) {
      console.log("Dialer Phone number is invalid. Terminating function.");
      setbuttonLoader(false);
      return;
    }

    let data = {
      dentist_full_name: values?.dentist_full_name,
      clinic_name: values?.clinic_name,
      clinic_phone_number: completePhoneNumber,
      email: values?.email,
      password: values?.password,
      clinic_logo: clinicLogo,
      clinic_favicon: clinicFavicon,

      clinic_address_state: values?.clinic_address_state,
      clinic_address_zip_code: values?.clinic_address_zip_code,
      clinic_address_city: values?.clinic_address_city,
      clinic_address_street: values?.clinic_address_street,
      clinic_address_country: values?.clinic_address_country,

      monday_from: mondayFrom ? mondayFrom : undefined,
      monday_to: mondayTo ? mondayTo : undefined,
      monday_closed: mondayClosed,
      tuesday_from: tuesdayFrom ? tuesdayFrom : undefined,
      tuesday_to: tuesdayTo ? tuesdayTo : undefined,
      tuesday_closed: tuesdayClosed,
      wednesday_from: wednesdayFrom ? wednesdayFrom : undefined,
      wednesday_to: wednesdayTo ? wednesdayTo : undefined,
      wednesday_closed: wednesdayClosed,
      thursday_from: thursdayFrom ? thursdayFrom : undefined,
      thursday_to: thursdayTo ? thursdayTo : undefined,
      thursday_closed: thursdayClosed,
      friday_from: fridayFrom ? fridayFrom : undefined,
      friday_to: fridayTo ? fridayTo : undefined,
      friday_closed: fridayClosed,
      saturday_from: saturdayFrom ? saturdayFrom : undefined,
      saturday_to: saturdayTo ? saturdayTo : undefined,
      saturday_closed: saturdayClosed,
      sunday_from: sundayFrom ? sundayFrom : undefined,
      sunday_to: sundayTo ? sundayTo : undefined,
      sunday_closed: sundayClosed,

      clinic_size: values?.clinic_size,
      staff_count: values?.staff_count,
      patients_average_per_week: values?.patients_average_per_week,
      in_house_arch_lab_yn: values?.in_house_arch_lab_yn,
      arch_digital_workflow_yn: values?.arch_digital_workflow_yn,
      services_frequently: values?.services_frequently,

      clinic_dialer_number: completePhoneNumberDialer,

      clinic_website: websiteList,
    };

    const token = localStorage.getItem("authToken");
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/createClinic`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Success",
          "Clinic added successfully"
        );
        setbuttonLoader(false);
        getAllClinicDetails();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setbuttonLoader(false);
        openNotificationWithIcon(
          "error",
          "Error",
          err?.response?.data?.message || err?.message
        );
      });
  };

  return (
    <Modal
      style={{ top: 20 }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            icon={<IoChevronBackSharp />}
            onClick={() => {
              setiscrearteNewClinicModalVisible(false);
            }}
          ></Button>

          <Typography style={{ marginLeft: 10 }}>Create New Clinic</Typography>
        </div>
      }
      visible={iscrearteNewClinicModalVisible}
      footer={
        <>
          <Divider style={{ margin: 0 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  crearteNewClinicModalForm?.resetFields();

                  setiscrearteNewClinicModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="custom-primary-button"
                loading={buttonLoader}
                onClick={() => {
                  crearteNewClinicModalForm?.submit();
                }}
              >
                Create
              </Button>
            </Space>
          </div>
        </>
      }
      closable={false}
      width={800}
      className="custom-modal"
    >
      <Form
        name="signup"
        form={crearteNewClinicModalForm}
        initialValues={{ remember: true }}
        onFinish={handleCreateNewClinic}
        layout="vertical"
        style={{ height: "73vh", overflow: "auto" }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Account" key="1" style={{ padding: 10 }}>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Dentist Full Name</Typography>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dentist_full_name"
                  label={<Typography className="custom-text1">Name</Typography>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter dentist full name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Please enter dentist full name"
                    className="custom-text1"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Name</Typography>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="clinic_name"
                  label={<Typography className="custom-text1">Name</Typography>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter clinic name!",
                    },
                  ]}
                >
                  <Input
                    className="custom-text1"
                    placeholder="Please enter clinic name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Phone Number</Typography>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Typography className="custom-text1">
                      Clinic Phone Number
                    </Typography>
                  }
                  required
                >
                  <Input.Group compact>
                    <Select
                      showSearch
                      style={{ width: "40%" }}
                      value={
                        selectedCountryPhoneNumber?.code &&
                        selectedCountryPhoneNumber?.dialCode
                          ? `${selectedCountryPhoneNumber?.code}|${selectedCountryPhoneNumber?.dialCode}`
                          : undefined
                      }
                      placeholder="search code"
                      onChange={handleCountryChange}
                      optionFilterProp="children"
                      filterOption={(input, option) => {
                        const searchText = input?.toLowerCase();
                        const dialCode = option?.value.split("|")[1];
                        return dialCode?.includes(searchText);
                      }}
                    >
                      {countries.map((country) => (
                        <Option
                          placeholder="search code"
                          key={country?.code}
                          value={`${country?.code}|${country?.dialCode}`}
                        >
                          <span>
                            <img
                              src={country?.flag}
                              alt={country?.name}
                              style={{
                                width: 16,
                                height: 12,
                                marginRight: 8,
                                borderRadius: 2,
                              }}
                            />
                            ({country?.dialCode})
                          </span>
                        </Option>
                      ))}
                    </Select>
                    <Form.Item
                      name="clinic_phone_number"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number!",
                        },
                      ]}
                    >
                      <Input
                        className="custom-text1"
                        style={{ width: "60%" }}
                        placeholder="Enter phone number"
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Email</Typography>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label={
                    <Typography className="custom-text1">Email</Typography>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    className="custom-text1"
                    placeholder="Please enter email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Password</Typography>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={
                    <Typography className="custom-text1">Password</Typography>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter password!",
                    },
                  ]}
                >
                  <Input.Password
                    className="custom-text1"
                    placeholder="Please enter password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Logo</Typography>
              </Col>
              <Col span={12}>
                <Form.Item name="clinic_logo">
                  <Space>
                    {clinicLogo ? (
                      <Image
                        size={50}
                        style={{ width: 200, height: 80, objectFit: "contain" }}
                        src={clinicLogo}
                      />
                    ) : (
                      ""
                    )}
                    {!clinicLogo ? (
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleClinicLogoChange(file);
                          return false;
                        }}
                        style={{ width: "100%" }}
                      >
                        <Button icon={<BiUpload />} style={{ marginTop: 8 }}>
                          Upload Clinic Logo
                        </Button>
                      </Upload>
                    ) : (
                      ""
                    )}
                    {clinicLogo ? (
                      <Button
                        type="link"
                        danger
                        onClick={handleClinicLogoDelete}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Favicon</Typography>
              </Col>
              <Col span={12}>
                <Form.Item name="clinic_favicon">
                  <Space>
                    {clinicFavicon ? (
                      <Avatar size={50} src={clinicFavicon} shape="square" />
                    ) : (
                      ""
                    )}

                    {!clinicFavicon ? (
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleClinicFaviconChange(file);
                          return false; // Prevent auto-upload
                        }}
                      >
                        <Button icon={<BiUpload />} style={{ marginTop: 8 }}>
                          Upload Clinic Favicon
                        </Button>
                      </Upload>
                    ) : (
                      ""
                    )}
                    {clinicFavicon ? (
                      <Button type="link" danger onClick={handleFaviconDelete}>
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Clinic Details" key="2" style={{ padding: 10 }}>
            <Row style={{ padding: "10px 0px 10px 0px" }}>
              <Col span={8}>
                <Typography>Clinic Address </Typography>
              </Col>
              <Col span={16}>
                <Row gutter={[10, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_state"
                      label={
                        <Typography className="custom-text1">State</Typography>
                      }
                    >
                      <Input
                        placeholder="Enter state"
                        className="custom-text1"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_zip_code"
                      label={
                        <Typography className="custom-text1">
                          ZIP Code
                        </Typography>
                      }
                    >
                      <Input
                        placeholder="Enter ZIP Code"
                        className="custom-text1"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_city"
                      label={
                        <Typography className="custom-text1">City</Typography>
                      }
                    >
                      <Input
                        placeholder="Enter clinic city"
                        className="custom-text1"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_street"
                      label={
                        <Typography className="custom-text1">Street</Typography>
                      }
                    >
                      <Input
                        placeholder="Enter clinic street"
                        className="custom-text1"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_country"
                      label={
                        <Typography className="custom-text1">
                          Country
                        </Typography>
                      }
                    >
                      <Input
                        placeholder="Enter country"
                        className="custom-text1"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography> Weekly Operating Hours</Typography>
              </Col>
              <Col span={16}>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={mondayClosed}
                        onChange={(e) => {
                          setMondayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Monday
                      </Typography>
                    </div>
                    {mondayClosed ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <>
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              mondayFrom ? dayjs(mondayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setMondayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setMondayFrom(null);
                              }
                            }}
                          />

                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            value={mondayTo ? dayjs(mondayTo, "hh:mm A") : null}
                            onChange={(time) => {
                              if (time) {
                                setMondayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setMondayTo(null);
                              }
                            }}
                            format={"hh:mm A"}
                          />
                        </>
                      </div>
                    ) : (
                      <Button
                        disabled
                        icon={<RiZzzFill />}
                        style={{ width: "100%", maxWidth: 250 }}
                      >
                        Closed
                      </Button>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={tuesdayClosed}
                        onChange={(e) => {
                          setTuesdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Tuesday
                      </Typography>
                    </div>

                    {tuesdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              tuesdayFrom ? dayjs(tuesdayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setTuesdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setTuesdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              tuesdayTo ? dayjs(tuesdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setTuesdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setTuesdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={wednesdayClosed}
                        onChange={(e) => {
                          setWednesdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Wednesday
                      </Typography>
                    </div>
                    {wednesdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              wednesdayFrom
                                ? dayjs(wednesdayFrom, "hh:mm A")
                                : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setWednesdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setWednesdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              wednesdayTo ? dayjs(wednesdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setWednesdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setWednesdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={thursdayClosed}
                        onChange={(e) => {
                          setThursdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Thursday
                      </Typography>
                    </div>
                    {thursdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              thursdayFrom
                                ? dayjs(thursdayFrom, "hh:mm A")
                                : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setThursdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setThursdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              thursdayTo ? dayjs(thursdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setThursdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setThursdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={fridayClosed}
                        onChange={(e) => {
                          setFridayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Friday
                      </Typography>
                    </div>
                    {fridayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              fridayFrom ? dayjs(fridayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setFridayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setFridayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={fridayTo ? dayjs(fridayTo, "hh:mm A") : null}
                            onChange={(time) => {
                              if (time) {
                                setFridayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setFridayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={saturdayClosed}
                        onChange={(e) => {
                          setSaturdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Saturday
                      </Typography>
                    </div>
                    {saturdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              saturdayFrom
                                ? dayjs(saturdayFrom, "hh:mm A")
                                : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setSaturdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setSaturdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              saturdayTo ? dayjs(saturdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setSaturdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setSaturdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={sundayClosed}
                        onChange={(e) => {
                          setSundayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Sunday
                      </Typography>
                    </div>
                    {sundayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              sundayFrom ? dayjs(sundayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setSundayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setSundayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={sundayTo ? dayjs(sundayTo, "hh:mm A") : null}
                            onChange={(time) => {
                              if (time) {
                                setSundayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setSundayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Clinic size</Typography>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="clinic_size"
                  label={
                    <Typography className="custom-text1">
                      What is clinic size?
                    </Typography>
                  }
                >
                  <Select
                    showSearch
                    placeholder="Select a clinic size"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={clinicSizeOption}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Staff Count</Typography>
              </Col>
              <Col span={16}>
                <Form.Item name="staff_count">
                  <Select
                    showSearch
                    placeholder="Select a dentists"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={clinicSizeOption}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Average Patients</Typography>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="patients_average_per_week"
                  label={
                    <Typography className="custom-text1">
                      How many patients do you see on average per week?
                    </Typography>
                  }
                >
                  <Select
                    showSearch
                    placeholder="Select a person"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={patientsAveragePerWeekOption}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Dental Services</Typography>
              </Col>
              <Col span={16}>
                <Form.Item name="services_frequently">
                  {serviceList.map((service) => (
                    <CustomButton
                      key={service}
                      service={service}
                      services={services}
                      onClick={() => addServices(service)}
                    />
                  ))}
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>In-house full arch lab?</Typography>
              </Col>
              <Col span={16}>
                <Form.Item name="in_house_arch_lab_yn">
                  <Row>
                    <Checkbox value="Y">Yes</Checkbox>
                    <Checkbox value="N">No</Checkbox>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Full arch digital workflow?</Typography>
              </Col>
              <Col span={16}>
                <Form.Item name="arch_digital_workflow_yn">
                  <Row>
                    <Checkbox value="Y">Yes</Checkbox>
                    <Checkbox value="N">No</Checkbox>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Dialer" key="3" style={{ padding: 10 }}>
            <Row
              gutter={[20, 20]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col span={12}>
                <Typography>Clinic Dialer Number </Typography>
              </Col>
              <Col span={12}>
                <Input.Group compact>
                  <Select
                    showSearch
                    style={{ width: "40%" }}
                    value={
                      selectedCountryPhoneNumberDialer?.code &&
                      selectedCountryPhoneNumberDialer?.dialCode
                        ? `${selectedCountryPhoneNumberDialer?.code}|${selectedCountryPhoneNumberDialer?.dialCode}`
                        : undefined
                    }
                    placeholder="Search code"
                    onChange={handleCountryChangeDialer}
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      const searchText = input?.toLowerCase();
                      const dialCode = option?.value.split("|")[1];
                      return dialCode?.includes(searchText);
                    }}
                  >
                    {countries.map((country) => (
                      <Option
                        key={country?.code}
                        value={`${country?.code}|${country?.dialCode}`}
                      >
                        <span>
                          <img
                            src={country?.flag}
                            alt={country?.name}
                            style={{
                              width: 16,
                              height: 12,
                              marginRight: 8,
                              borderRadius: 2,
                            }}
                          />
                          ({country?.dialCode})
                        </span>
                      </Option>
                    ))}
                  </Select>

                  <Form.Item name="clinic_dialer" noStyle>
                    <Input
                      className="custom-text1"
                      style={{ width: "60%" }}
                      placeholder="Enter dialer phone number"
                    />
                  </Form.Item>
                </Input.Group>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Websites" key="4" style={{ padding: 10 }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col span={24}>
                <label>Clinic Website</label>
                <Input
                  className="custom-text1"
                  placeholder="Please enter clinic website"
                  value={currentValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </Col>
              <Col span={24}>
                {websiteList.map((val, index) => (
                  <Tag
                    key={index}
                    className="custom-text1"
                    style={{
                      padding: 10,
                      margin: "10px 0px 10px 0px",
                      background: "#FCF9FF",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title="Open Link">
                      <a
                        href={val}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#72779E", display: "flex" }}
                      >
                        <LinkOutlined
                          style={{ marginRight: 10, fontSize: 14 }}
                        />
                        <Image
                          src={getLogoUrl(val)}
                          alt="Website Logo"
                          preview={false}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 8,
                            borderRadius: 4,
                            objectFit: "contain",
                          }}
                        />
                        <Typography>{val}</Typography>
                      </a>
                    </Tooltip>

                    <Tooltip title="Remove">
                      <DeleteOutlined
                        onClick={() => handleRemoveValue(val)}
                        style={{
                          color: "#ff4d4f",
                          cursor: "pointer",
                          fontSize: 14,
                        }}
                      />
                    </Tooltip>
                  </Tag>
                ))}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};

export const VieworEditClinicDetailsModal = ({
  isVieworEditClinicDetailsModal,
  setisVieworEditClinicDetailsModal,
  openModeClinicDetails,
  selectedClinicDetails,
  setselectedClinicDetails,
  openNotificationWithIcon,
  buttonLoader,
  setbuttonLoader,
  getAllClinicDetails,
}) => {
  const [VieworEditClinicDetailsModalForm] = Form.useForm();
  const [services, setservices] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [websiteList, setwebsiteList] = useState([]);

  const [clinicLogo, setclinicLogo] = useState();
  const [clinicFavicon, setclinicFavicon] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountryPhoneNumber, setselectedCountryPhoneNumber] =
    useState();
  const [
    selectedCountryPhoneNumberDialer,
    setselectedCountryPhoneNumberDialer,
  ] = useState();

  const [mondayFrom, setMondayFrom] = useState();
  const [mondayTo, setMondayTo] = useState();
  const [mondayClosed, setMondayClosed] = useState(true);

  const [tuesdayFrom, setTuesdayFrom] = useState();
  const [tuesdayTo, setTuesdayTo] = useState();
  const [tuesdayClosed, setTuesdayClosed] = useState(true);

  const [wednesdayFrom, setWednesdayFrom] = useState();
  const [wednesdayTo, setWednesdayTo] = useState();
  const [wednesdayClosed, setWednesdayClosed] = useState(true);

  const [thursdayFrom, setThursdayFrom] = useState();
  const [thursdayTo, setThursdayTo] = useState();
  const [thursdayClosed, setThursdayClosed] = useState(true);

  const [fridayFrom, setFridayFrom] = useState();
  const [fridayTo, setFridayTo] = useState();
  const [fridayClosed, setFridayClosed] = useState(true);

  const [saturdayFrom, setSaturdayFrom] = useState();
  const [saturdayTo, setSaturdayTo] = useState();
  const [saturdayClosed, setSaturdayClosed] = useState(false);

  const [sundayFrom, setSundayFrom] = useState();
  const [sundayTo, setSundayTo] = useState();
  const [sundayClosed, setSundayClosed] = useState(false);

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };

  const serviceList = [
    "Full Arch",
    "Dental Implants",
    "General Dentistry",
    "Othodontics",
    "Cosmetic Dentistry",
    "Oral Surgery",
    "Pediatric Dentistry",
  ];

  const clinicSizeOption = [
    {
      value: "1-5 dentists",
      lable: "1-5 dentists",
    },
    {
      value: "6-10 dentists",
      lable: "6-10 dentists",
    },
    {
      value: "11-15 dentists",
      lable: "11-15 dentists",
    },
    {
      value: "16-20 dentists",
      lable: "16-20 dentists",
    },
    {
      value: "21-25 dentists",
      lable: "21-25 dentists",
    },
    {
      value: "25+ dentists",
      lable: "25+ dentists",
    },
  ];

  const patientsAveragePerWeekOption = [
    {
      value: "Less Than 50",
      lable: "Less Than 50",
    },
    {
      value: "51-100",
      lable: "51-100",
    },
    {
      value: "101-150",
      lable: "101-150",
    },
    {
      value: "More Than 150",
      lable: "More Than 150",
    },
  ];

  const handleValidation = (dialCode, phoneNumber) => {
    const fullNumber = `${dialCode}${phoneNumber}`;
    const phoneNumberObject = parsePhoneNumberFromString(
      fullNumber,
      selectedCountryPhoneNumber?.code
    );

    if (phoneNumberObject && !phoneNumberObject?.isValid()) {
      VieworEditClinicDetailsModalForm.resetFields(["clinic_phone_number"]);
      message.error("Please enter a valid clinic phone number.");
    }
    return phoneNumberObject?.isValid();
  };

  const handleValidationDialer = (dialCode, phoneNumber) => {
    const fullNumber = `${dialCode}${phoneNumber}`;
    const phoneNumberObject = parsePhoneNumberFromString(
      fullNumber,
      selectedCountryPhoneNumberDialer?.code
    );

    if (phoneNumberObject && !phoneNumberObject.isValid()) {
      VieworEditClinicDetailsModalForm.resetFields(["clinic_phone_number"]);
      message.error("Please enter a valid dialer phone number.");
    }
    return phoneNumberObject?.isValid();
  };

  const addServices = (val) => {
    if (services.includes(val.trim())) {
      setservices(services.filter((service) => service !== val));
    } else {
      setservices([...services, val]);
    }
  };

  const CustomButton = ({ service, services, onClick }) => {
    const isSelected = services.includes(service);

    return (
      <Button
        className="custom-btn"
        style={{
          color: isSelected ? "#3900DB" : "",
          borderColor: isSelected ? "#3900DB" : "",
          background: isSelected ? "#ECEEFF" : "",
        }}
        onClick={onClick}
      >
        {isSelected ? <PiCheckBold /> : ""}
        {service}
      </Button>
    );
  };

  const isValidUrl = (value) => {
    try {
      // Attempt to create a new URL object
      new URL(value);
      return true; // If no error is thrown, the URL is valid
    } catch (_) {
      return false; // If an error is thrown, the URL is invalid
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      // Example usage
      if (isValidUrl(currentValue.trim())) {
        if (currentValue.trim() && !websiteList.includes(currentValue.trim())) {
          setwebsiteList([...websiteList, currentValue.trim()]);
        }
        setCurrentValue();
      } else {
        openNotificationWithIcon("error", "Clinic", "Please enter valid URL");
      }
    }
  };

  const getLogoUrl = (url) => {
    if (isValidUrl(url)) {
      const domain = new URL(url)?.hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
  };

  const handleRemoveValue = (removedValue) => {
    setwebsiteList(websiteList.filter((v) => v !== removedValue));
  };

  const handleClinicLogoChange = async (file) => {
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    try {
      let fileToUpload = file;

      if (file.size > maxSizeInBytes) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        fileToUpload = await imageCompression(file, options);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setclinicLogo(e.target.result);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Image compression failed. Please try again with a smaller file.");
    }
  };

  const handleClinicLogoDelete = () => {
    setclinicLogo();
  };

  const handleClinicFaviconChange = async (file) => {
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    try {
      let fileToUpload = file;

      if (file.size > maxSizeInBytes) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        fileToUpload = await imageCompression(file, options);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setclinicFavicon(e.target.result);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Image compression failed. Please try again with a smaller file.");
    }
  };

  const handleFaviconDelete = () => {
    setclinicFavicon();
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryList = data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
        dialCode: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
        flag: country.flags.svg,
      }));
      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    setwebsiteList(
      selectedClinicDetails?.clinic_website
        ? selectedClinicDetails?.clinic_website?.split(",")
        : []
    );
    setMondayFrom(
      selectedClinicDetails?.monday_from
        ? selectedClinicDetails?.monday_from
        : ""
    );
    setMondayTo(
      selectedClinicDetails?.monday_to ? selectedClinicDetails?.monday_to : ""
    );
    setMondayClosed(
      selectedClinicDetails?.monday_closed === "true" ? true : false
    );
    setTuesdayFrom(
      selectedClinicDetails?.tuesday_from
        ? selectedClinicDetails?.tuesday_from
        : ""
    );
    setTuesdayTo(
      selectedClinicDetails?.tuesday_to ? selectedClinicDetails?.tuesday_to : ""
    );
    setTuesdayClosed(
      selectedClinicDetails?.tuesday_closed === "true" ? true : false
    );
    setWednesdayFrom(
      selectedClinicDetails?.wednesday_from
        ? selectedClinicDetails?.wednesday_from
        : ""
    );
    setWednesdayTo(
      selectedClinicDetails?.wednesday_to
        ? selectedClinicDetails?.wednesday_to
        : ""
    );
    setWednesdayClosed(
      selectedClinicDetails?.wednesday_closed === "true" ? true : false
    );
    setThursdayFrom(
      selectedClinicDetails?.thursday_from
        ? selectedClinicDetails?.thursday_from
        : ""
    );
    setThursdayTo(
      selectedClinicDetails?.thursday_to
        ? selectedClinicDetails?.thursday_to
        : ""
    );
    setThursdayClosed(
      selectedClinicDetails?.thursday_closed === "true" ? true : false
    );
    setFridayFrom(
      selectedClinicDetails?.friday_from
        ? selectedClinicDetails?.friday_from
        : ""
    );
    setFridayTo(
      selectedClinicDetails?.friday_to ? selectedClinicDetails?.friday_to : ""
    );
    setFridayClosed(
      selectedClinicDetails?.friday_closed === "true" ? true : false
    );
    setSaturdayFrom(
      selectedClinicDetails?.saturday_from
        ? selectedClinicDetails?.saturday_from
        : ""
    );
    setSaturdayTo(
      selectedClinicDetails?.saturday_to
        ? selectedClinicDetails?.saturday_to
        : ""
    );
    setSaturdayClosed(
      selectedClinicDetails?.saturday_closed === "true" ? true : false
    );
    setSundayFrom(
      selectedClinicDetails?.sunday_from
        ? selectedClinicDetails?.sunday_from
        : ""
    );
    setSundayTo(
      selectedClinicDetails?.sunday_to ? selectedClinicDetails?.sunday_to : ""
    );
    setSundayClosed(
      selectedClinicDetails?.sunday_closed === "true" ? true : false
    );
    
    if (
      selectedClinicDetails?.owner?.password &&
      selectedClinicDetails?.owner?.iv_encrypted_password
    ) {
      VieworEditClinicDetailsModalForm?.setFieldValue(
        "password",
        decryptPassword(
          selectedClinicDetails?.owner?.password,
          selectedClinicDetails?.owner?.iv_encrypted_password
        )
      );
    }

    VieworEditClinicDetailsModalForm?.setFieldValue(
      "dentist_full_name",
      selectedClinicDetails?.owner?.dentist_full_name
    );

    if (selectedClinicDetails?.clinic_phone_number) {
      const phoneNumber = parsePhoneNumber(
        selectedClinicDetails?.clinic_phone_number
      );

      if (phoneNumber && phoneNumber?.isValid()) {
        const country = countries.find(
          (c) => c.dialCode === `+${phoneNumber.countryCallingCode}`
        );

        if (country) {
          setselectedCountryPhoneNumber({
            code: country.code,
            dialCode: country.dialCode,
          });
          VieworEditClinicDetailsModalForm?.setFieldValue(
            "clinic_phone_number",
            phoneNumber?.nationalNumber
          );
        } else {
          setselectedCountryPhoneNumber();
        }
      }
    }

    if (selectedClinicDetails?.clinic_dialer_number) {
      const phoneNumber = parsePhoneNumber(
        selectedClinicDetails?.clinic_phone_number
      );
      if (phoneNumber && phoneNumber.isValid()) {
        const country = countries.find(
          (c) => c.dialCode === `+${phoneNumber.countryCallingCode}`
        );
        if (country) {
          setselectedCountryPhoneNumberDialer({
            code: country.code,
            dialCode: country.dialCode,
          });
          VieworEditClinicDetailsModalForm?.setFieldValue(
            "clinic_dialer",
            phoneNumber?.nationalNumber
          );
        } else {
          setselectedCountryPhoneNumberDialer();
        }
      }
    }
    VieworEditClinicDetailsModalForm?.setFieldValue(
      "clinic_name",
      selectedClinicDetails?.clinic_name
    );
    VieworEditClinicDetailsModalForm?.setFieldValue(
      "email",
      selectedClinicDetails?.owner?.email
    );
    setclinicLogo(selectedClinicDetails?.clinic_logo);
    setclinicFavicon(selectedClinicDetails?.clinic_favicon);
    fetchCountries();
  
  }, [selectedClinicDetails]);

  const handleCountryChange = (value) => {
    const [code, dialCode] = value.split("|");
    setselectedCountryPhoneNumber({ code, dialCode });
  };

  const handleCountryChangeDialer = (value) => {
    const [code, dialCode] = value.split("|");
    setselectedCountryPhoneNumberDialer({ code, dialCode });
  };

  const handleUpdateClinicDetails = async (values) => {
    setbuttonLoader(true);
    const completePhoneNumber = `${selectedCountryPhoneNumber?.dialCode}${values?.clinic_phone_number}`;
    const completePhoneNumberDialer = `${selectedCountryPhoneNumberDialer?.dialCode}${values?.clinic_dialer}`;
    if (!selectedCountryPhoneNumber?.dialCode) {
      message.error("Please select country code for clinic phone number");
      setbuttonLoader(false);
      return;
    }
  
    const valid = await handleValidation(
      selectedCountryPhoneNumber?.dialCode,
      values?.clinic_phone_number
    );
    if (!valid) {
      console.log("Phone number is invalid. Terminating function.");
      setbuttonLoader(false);
      return;
    }

    if (!selectedCountryPhoneNumberDialer?.dialCode) {
      message.error("Please select country code for dialer phone number");
      setbuttonLoader(false);
      return;
    }
    const validdialer = await handleValidationDialer(
      selectedCountryPhoneNumberDialer?.dialCode,
      values?.clinic_dialer
    );
    console.log( selectedCountryPhoneNumberDialer?.dialCode, values?.clinic_dialer)
    if (!validdialer) {
      console.log("Dialer Phone number is invalid. Terminating function.");
      setbuttonLoader(false);
      return;
    }

    let data = {
      id: selectedClinicDetails?.id,
      dentist_full_name: values?.dentist_full_name || undefined,
      clinic_name: values?.clinic_name || undefined,
      clinic_phone_number: completePhoneNumber || undefined,
      email: values?.email || undefined,
      password: values?.password || undefined,
      clinic_logo: clinicLogo || undefined,
      clinic_favicon: clinicFavicon || undefined,

      clinic_address_state: values?.clinic_address_state || undefined,
      clinic_address_zip_code: values?.clinic_address_zip_code || undefined,
      clinic_address_city: values?.clinic_address_city || undefined,
      clinic_address_street: values?.clinic_address_street || undefined,
      clinic_address_country: values?.clinic_address_country || undefined,

      monday_from: mondayFrom ? mondayFrom : undefined,
      monday_to: mondayTo ? mondayTo : undefined,
      monday_closed: mondayClosed,
      tuesday_from: tuesdayFrom ? tuesdayFrom : undefined,
      tuesday_to: tuesdayTo ? tuesdayTo : undefined,
      tuesday_closed: tuesdayClosed,
      wednesday_from: wednesdayFrom ? wednesdayFrom : undefined,
      wednesday_to: wednesdayTo ? wednesdayTo : undefined,
      wednesday_closed: wednesdayClosed,
      thursday_from: thursdayFrom ? thursdayFrom : undefined,
      thursday_to: thursdayTo ? thursdayTo : undefined,
      thursday_closed: thursdayClosed,
      friday_from: fridayFrom ? fridayFrom : undefined,
      friday_to: fridayTo ? fridayTo : undefined,
      friday_closed: fridayClosed,
      saturday_from: saturdayFrom ? saturdayFrom : undefined,
      saturday_to: saturdayTo ? saturdayTo : undefined,
      saturday_closed: saturdayClosed,
      sunday_from: sundayFrom ? sundayFrom : undefined,
      sunday_to: sundayTo ? sundayTo : undefined,
      sunday_closed: sundayClosed,

      clinic_size: values?.clinic_size || undefined,
      staff_count: values?.staff_count || undefined,
      patients_average_per_week: values?.patients_average_per_week || undefined,
      in_house_arch_lab_yn: values?.in_house_arch_lab_yn || undefined,
      arch_digital_workflow_yn: values?.arch_digital_workflow_yn || undefined,
      services_frequently: values?.services_frequently || undefined,

      clinic_dialer_number: completePhoneNumberDialer || undefined,

      clinic_website: websiteList || undefined,
    };

    const token = localStorage.getItem("authToken");
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/updateClinic`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Success",
          "Clinic added successfully"
        );
        setbuttonLoader(false);
        getAllClinicDetails();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        setbuttonLoader(false);
        openNotificationWithIcon(
          "error",
          "Error",
          err?.response?.data?.message || err?.message
        );
      });
  };

  return (
    <Modal
      style={{ top: 20 }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            icon={<IoChevronBackSharp />}
            onClick={() => {
              setselectedClinicDetails();
              setisVieworEditClinicDetailsModal(false);
            }}
          ></Button>

          <Typography style={{ marginLeft: 10 }}>
            {openModeClinicDetails === "view"
              ? "View Clinic Details"
              : "Update Clinic Details"}
          </Typography>
        </div>
      }
      visible={isVieworEditClinicDetailsModal}
      footer={
        <>
          {openModeClinicDetails === "view" ? (
            []
          ) : (
            <>
              <Divider style={{ margin: 0 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 10,
                }}
              >
                <Space>
                  <Button
                    onClick={() => {
                      VieworEditClinicDetailsModalForm?.resetFields();
                      setselectedClinicDetails();
                      setisVieworEditClinicDetailsModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="custom-primary-button"
                    loading={buttonLoader}
                    onClick={() => {
                      console.log("asdasdasd");
                      VieworEditClinicDetailsModalForm?.submit();
                    }}
                  >
                    Update
                  </Button>
                </Space>
              </div>
            </>
          )}
        </>
      }
      closable={false}
      width={800}
      className="custom-modal"
    >
      <Form
        name="crearteNewClinicModalForm"
        form={VieworEditClinicDetailsModalForm}
        initialValues={{ remember: true }}
        onFinish={handleUpdateClinicDetails}
        layout="vertical"
        style={{ height: "73vh", overflow: "auto" }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Account" key="1" style={{ padding: 10 }}>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Dentist Full Name</Typography>
              </Col>
              <Col span={12}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.owner?.dentist_full_name}
                  </Typography>
                ) : (
                  <Form.Item
                    name="dentist_full_name"
                    label={
                      <Typography className="custom-text1">Name</Typography>
                    }
                  >
                    <Input
                      placeholder="Please enter dentist full name"
                      className="custom-text1"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Name</Typography>
              </Col>
              <Col span={12}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.clinic_name}
                  </Typography>
                ) : (
                  <Form.Item
                    name="clinic_name"
                    label={
                      <Typography className="custom-text1">Name</Typography>
                    }
                  >
                    <Input
                      className="custom-text1"
                      placeholder="Please enter clinic name"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Phone Number</Typography>
              </Col>
              <Col span={12}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.clinic_phone_number}
                  </Typography>
                ) : (
                  <Form.Item
                    label={
                      <Typography className="custom-text1">
                        Clinic Phone Number
                      </Typography>
                    }
                    required
                  >
                    <Input.Group compact>
                      <Select
                        showSearch
                        style={{ width: "40%" }}
                        value={
                          selectedCountryPhoneNumber?.code &&
                          selectedCountryPhoneNumber?.dialCode
                            ? `${selectedCountryPhoneNumber?.code}|${selectedCountryPhoneNumber?.dialCode}`
                            : undefined
                        }
                        placeholder="search code"
                        onChange={handleCountryChange}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          const searchText = input?.toLowerCase();
                          const dialCode = option?.value.split("|")[1];
                          return dialCode?.includes(searchText);
                        }}
                      >
                        {countries.map((country) => (
                          <Option
                            placeholder="search code"
                            key={country?.code}
                            value={`${country?.code}|${country?.dialCode}`}
                          >
                            <span>
                              <img
                                src={country?.flag}
                                alt={country?.name}
                                style={{
                                  width: 16,
                                  height: 12,
                                  marginRight: 8,
                                  borderRadius: 2,
                                }}
                              />
                              ({country?.dialCode})
                            </span>
                          </Option>
                        ))}
                      </Select>
                      <Form.Item name="clinic_phone_number" noStyle>
                        <Input
                          className="custom-text1"
                          style={{ width: "60%" }}
                          placeholder="Enter phone number"
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Email</Typography>
              </Col>
              <Col span={12}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.owner?.email}
                  </Typography>
                ) : (
                  <Form.Item
                    name="email"
                    label={
                      <Typography className="custom-text1">Email</Typography>
                    }
                  >
                    <Input
                      className="custom-text1"
                      placeholder="Please enter email"
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Password</Typography>
              </Col>
              <Col span={12}>
               
                  <Form.Item
                    name="password"
                    label={
                      <Typography className="custom-text1">Password</Typography>
                    }
                  >
                    <Input.Password
                      className="custom-text1"
                      placeholder="Please enter password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Logo</Typography>
              </Col>
              <Col span={12}>
                <Form.Item name="clinic_logo">
                  <Space>
                    {clinicLogo ? (
                      <Image
                        size={50}
                        style={{ width: 200, height: 80, objectFit: "contain" }}
                        src={clinicLogo}
                      />
                    ) : (
                      ""
                    )}
                    {!clinicLogo ? (
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleClinicLogoChange(file);
                          return false;
                        }}
                        style={{ width: "100%" }}
                      >
                        <Button icon={<BiUpload />} style={{ marginTop: 8 }}>
                          Upload Clinic Logo
                        </Button>
                      </Upload>
                    ) : (
                      ""
                    )}
                    {clinicLogo ? (
                      <Button
                        type="link"
                        danger
                        onClick={handleClinicLogoDelete}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={12}>
                <Typography>Clinic Favicon</Typography>
              </Col>
              <Col span={12}>
                <Form.Item name="clinic_favicon">
                  <Space>
                    {clinicFavicon ? (
                      <Avatar size={50} src={clinicFavicon} shape="square" />
                    ) : (
                      ""
                    )}

                    {!clinicFavicon ? (
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleClinicFaviconChange(file);
                          return false; // Prevent auto-upload
                        }}
                      >
                        <Button icon={<BiUpload />} style={{ marginTop: 8 }}>
                          Upload Clinic Favicon
                        </Button>
                      </Upload>
                    ) : (
                      ""
                    )}
                    {clinicFavicon ? (
                      <Button type="link" danger onClick={handleFaviconDelete}>
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Clinic Details" key="2" style={{ padding: 10 }}>
            <Row style={{ padding: "10px 0px 10px 0px" }}>
              <Col span={8}>
                <Typography>Clinic Address </Typography>
              </Col>
              <Col span={16}>
                <Row gutter={[10, 0]}>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_state"
                      label={
                        <Typography className="custom-text1">State</Typography>
                      }
                    >
                      {openModeClinicDetails === "view" ? (
                        <Typography className="custom-text1">
                          {selectedClinicDetails?.clinic_address_state}
                        </Typography>
                      ) : (
                        <Input
                          defaultValue={
                            selectedClinicDetails?.clinic_address_state
                              ? selectedClinicDetails?.clinic_address_state
                              : ""
                          }
                          placeholder="Enter state"
                          className="custom-text1"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_zip_code"
                      label={
                        <Typography className="custom-text1">
                          ZIP Code
                        </Typography>
                      }
                    >
                      {openModeClinicDetails === "view" ? (
                        <Typography className="custom-text1">
                          {selectedClinicDetails?.clinic_address_zip_code}
                        </Typography>
                      ) : (
                        <Input
                          defaultValue={
                            selectedClinicDetails?.clinic_address_zip_code
                              ? selectedClinicDetails?.clinic_address_zip_code
                              : ""
                          }
                          placeholder="Enter ZIP Code"
                          className="custom-text1"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_city"
                      label={
                        <Typography className="custom-text1">City</Typography>
                      }
                    >
                      {openModeClinicDetails === "view" ? (
                        <Typography className="custom-text1">
                          {selectedClinicDetails?.clinic_address_city}
                        </Typography>
                      ) : (
                        <Input
                          defaultValue={
                            selectedClinicDetails?.clinic_address_city
                              ? selectedClinicDetails?.clinic_address_city
                              : ""
                          }
                          placeholder="Enter clinic city"
                          className="custom-text1"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_street"
                      label={
                        <Typography className="custom-text1">Street</Typography>
                      }
                    >
                      {openModeClinicDetails === "view" ? (
                        <Typography className="custom-text1">
                          {selectedClinicDetails?.clinic_address_street}
                        </Typography>
                      ) : (
                        <Input
                          defaultValue={
                            selectedClinicDetails?.clinic_address_street
                              ? selectedClinicDetails?.clinic_address_street
                              : ""
                          }
                          placeholder="Enter clinic street"
                          className="custom-text1"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="clinic_address_country"
                      label={
                        <Typography className="custom-text1">
                          Country
                        </Typography>
                      }
                    >
                      {openModeClinicDetails === "view" ? (
                        <Typography className="custom-text1">
                          {selectedClinicDetails?.clinic_address_country}
                        </Typography>
                      ) : (
                        <Input
                          defaultValue={
                            selectedClinicDetails?.clinic_address_country
                              ? selectedClinicDetails?.clinic_address_country
                              : ""
                          }
                          placeholder="Enter country"
                          className="custom-text1"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography> Weekly Operating Hours</Typography>
              </Col>
              <Col span={16}>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={mondayClosed}
                        onChange={(e) => {
                          setMondayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Monday
                      </Typography>
                    </div>
                    {mondayClosed ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <>
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              mondayFrom ? dayjs(mondayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setMondayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setMondayFrom(null);
                              }
                            }}
                          />

                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            value={mondayTo ? dayjs(mondayTo, "hh:mm A") : null}
                            onChange={(time) => {
                              if (time) {
                                setMondayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setMondayTo(null);
                              }
                            }}
                            format={"hh:mm A"}
                          />
                        </>
                      </div>
                    ) : (
                      <Button
                        disabled
                        icon={<RiZzzFill />}
                        style={{ width: "100%", maxWidth: 250 }}
                      >
                        Closed
                      </Button>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={tuesdayClosed}
                        onChange={(e) => {
                          setTuesdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Tuesday
                      </Typography>
                    </div>

                    {tuesdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              tuesdayFrom ? dayjs(tuesdayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setTuesdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setTuesdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              tuesdayTo ? dayjs(tuesdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setTuesdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setTuesdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={wednesdayClosed}
                        onChange={(e) => {
                          setWednesdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Wednesday
                      </Typography>
                    </div>
                    {wednesdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              wednesdayFrom
                                ? dayjs(wednesdayFrom, "hh:mm A")
                                : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setWednesdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setWednesdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              wednesdayTo ? dayjs(wednesdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setWednesdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setWednesdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={thursdayClosed}
                        onChange={(e) => {
                          setThursdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Thursday
                      </Typography>
                    </div>
                    {thursdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              thursdayFrom
                                ? dayjs(thursdayFrom, "hh:mm A")
                                : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setThursdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setThursdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              thursdayTo ? dayjs(thursdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setThursdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setThursdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={fridayClosed}
                        onChange={(e) => {
                          setFridayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Friday
                      </Typography>
                    </div>
                    {fridayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              fridayFrom ? dayjs(fridayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setFridayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setFridayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={fridayTo ? dayjs(fridayTo, "hh:mm A") : null}
                            onChange={(time) => {
                              if (time) {
                                setFridayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setFridayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={saturdayClosed}
                        onChange={(e) => {
                          setSaturdayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Saturday
                      </Typography>
                    </div>
                    {saturdayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              saturdayFrom
                                ? dayjs(saturdayFrom, "hh:mm A")
                                : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setSaturdayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setSaturdayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              saturdayTo ? dayjs(saturdayTo, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setSaturdayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setSaturdayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                  <Col
                    span={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Switch
                        checked={sundayClosed}
                        onChange={(e) => {
                          setSundayClosed(e);
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Sunday
                      </Typography>
                    </div>
                    {sundayClosed ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography style={{ marginRight: "5px" }}>
                            From
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={
                              sundayFrom ? dayjs(sundayFrom, "hh:mm A") : null
                            }
                            onChange={(time) => {
                              if (time) {
                                setSundayFrom(dayjs(time).format("hh:mm A"));
                              } else {
                                setSundayFrom(null);
                              }
                            }}
                          />
                          <Typography style={{ margin: "0px 5px" }}>
                            To
                          </Typography>
                          <TimePicker
                            format={"hh:mm A"}
                            value={sundayTo ? dayjs(sundayTo, "hh:mm A") : null}
                            onChange={(time) => {
                              if (time) {
                                setSundayTo(dayjs(time).format("hh:mm A"));
                              } else {
                                setSundayTo(null);
                              }
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled
                          icon={<RiZzzFill />}
                          style={{ width: "100%", maxWidth: 250 }}
                        >
                          Closed
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Clinic size</Typography>
              </Col>
              <Col span={16}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.clinic_size || "-"}
                  </Typography>
                ) : (
                  <Form.Item
                    name="clinic_size"
                    label={
                      <Typography className="custom-text1">
                        What is clinic size?
                      </Typography>
                    }
                  >
                    <Select
                      showSearch
                      placeholder="Select a clinic size"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={clinicSizeOption}
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Staff Count</Typography>
              </Col>
              <Col span={16}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.staff_count || "-"}
                  </Typography>
                ) : (
                  <Form.Item name="staff_count">
                    <Select
                      showSearch
                      placeholder="Select a dentists"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={clinicSizeOption}
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Average Patients</Typography>
              </Col>
              <Col span={16}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.patients_average_per_week || "-"}
                  </Typography>
                ) : (
                  <Form.Item
                    name="patients_average_per_week"
                    label={
                      <Typography className="custom-text1">
                        How many patients do you see on average per week?
                      </Typography>
                    }
                  >
                    <Select
                      showSearch
                      placeholder="Select a person"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={patientsAveragePerWeekOption}
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Dental Services</Typography>
              </Col>
              <Col span={16}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.services_frequently || "-"}
                  </Typography>
                ) : (
                  <Form.Item name="services_frequently">
                    {serviceList.map((service) => (
                      <CustomButton
                        key={service}
                        service={service}
                        services={services}
                        onClick={() => addServices(service)}
                      />
                    ))}
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>In-house full arch lab?</Typography>
              </Col>
              <Col span={16}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.in_house_arch_lab_yn === "Y"
                      ? "Yes"
                      : "No"}
                  </Typography>
                ) : (
                  <Form.Item name="in_house_arch_lab_yn">
                    <Row>
                      <Checkbox value="Y">Yes</Checkbox>
                      <Checkbox value="N">No</Checkbox>
                    </Row>
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: 0 }} />
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0px 10px 0px",
              }}
            >
              <Col span={8}>
                <Typography>Full arch digital workflow?</Typography>
              </Col>
              <Col span={16}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.arch_digital_workflow_yn === "Y"
                      ? "Yes"
                      : "No"}
                  </Typography>
                ) : (
                  <Form.Item name="arch_digital_workflow_yn">
                    <Row>
                      <Checkbox value="Y">Yes</Checkbox>
                      <Checkbox value="N">No</Checkbox>
                    </Row>
                  </Form.Item>
                )}
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Dialer" key="3" style={{ padding: 10 }}>
            <Row
              gutter={[20, 20]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col span={12}>
                <Typography>Clinic Dialer Number </Typography>
              </Col>
              <Col span={12}>
                {openModeClinicDetails === "view" ? (
                  <Typography className="custom-text1">
                    {selectedClinicDetails?.clinic_dialer_number || "-"}
                  </Typography>
                ) : (
                
                    <Input.Group compact>
                      <Select
                        showSearch
                        style={{ width: "40%" }}
                        value={
                          selectedCountryPhoneNumberDialer?.code &&
                          selectedCountryPhoneNumberDialer?.dialCode
                            ? `${selectedCountryPhoneNumberDialer?.code}|${selectedCountryPhoneNumberDialer?.dialCode}`
                            : undefined
                        }
                        placeholder="search code"
                        onChange={handleCountryChangeDialer}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          const searchText = input?.toLowerCase();
                          const dialCode = option?.value.split("|")[1];
                          return dialCode?.includes(searchText);
                        }}
                      >
                        {countries.map((country) => (
                          <Option
                            placeholder="search code"
                            key={country?.code}
                            value={`${country?.code}|${country?.dialCode}`}
                          >
                            <span>
                              <img
                                src={country?.flag}
                                alt={country?.name}
                                style={{
                                  width: 16,
                                  height: 12,
                                  marginRight: 8,
                                  borderRadius: 2,
                                }}
                              />
                              ({country?.dialCode})
                            </span>
                          </Option>
                        ))}
                      </Select>
                      <Form.Item name="clinic_dialer" noStyle>
                        <Input
                          className="custom-text1"
                          style={{ width: "60%" }}
                          placeholder="Enter phone number"
                        />
                      </Form.Item>
                    </Input.Group>
               
                )}
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Websites" key="4" style={{ padding: 10 }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col span={24}>
                <label>Clinic Website</label>
                {openModeClinicDetails !== "view" ? (
                  <>
                    <Input
                      className="custom-text1"
                      placeholder="Please enter clinic website"
                      value={currentValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                  </>
                ) : (
                  ""
                )}
              </Col>
              <Col span={24}>
                {websiteList?.map((val, index) => (
                  <Tag
                    key={index}
                    className="custom-text1"
                    style={{
                      padding: 10,
                      margin: "10px 0px 10px 0px",
                      background: "#FCF9FF",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title="Open Link">
                      <a
                        href={val}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#72779E", display: "flex" }}
                      >
                        <LinkOutlined
                          style={{ marginRight: 10, fontSize: 14 }}
                        />
                        <Image
                          src={getLogoUrl(val)}
                          alt="Website Logo"
                          preview={false}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 8,
                            borderRadius: 4,
                            objectFit: "contain",
                          }}
                        />
                        <Typography>{val}</Typography>
                      </a>
                    </Tooltip>
                    {openModeClinicDetails !== "view" ? (
                      <Tooltip title="Remove">
                        <DeleteOutlined
                          onClick={() => handleRemoveValue(val)}
                          style={{
                            color: "#ff4d4f",
                            cursor: "pointer",
                            fontSize: 14,
                          }}
                        />
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </Tag>
                ))}
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  );
};
