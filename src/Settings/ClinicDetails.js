import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  Typography,
  Space,
  Upload,
  Divider,
  Tabs,
  Switch,
  TimePicker,
  Image,
  Skeleton,
} from "antd";
import {
  FacebookIconSvg,
  InstagramIconSvg,
  TiktokIconSvg,
  TwitterIconSvg,
  WhatsAppIconSvg,
} from "../Common/SettingSidebarIconsSvg";
import imageCompression from "browser-image-compression";
import { RiZzzFill } from "react-icons/ri";
import dayjs from "dayjs";
import axios from "axios";

const { Text } = Typography;

const ClinicDetails = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [buttonLoader, setbuttonLoader] = useState();
  const [pageloader, setpageloader] = useState();
  const [clinicLogo, setclinicLogo] = useState();
  const [clinicFavicon, setclinicFavicon] = useState();
  const [clinicName, setclinicName] = useState();
  const [clinicPhoneNumber, setclinicPhoneNumber] = useState();
  const [clinicWebsite, setclinicWebsite] = useState();
  const [clinicAddressState, setclinicAddressState] = useState();
  const [clinicAddressZIPCode, setclinicAddressZIPCode] = useState();
  const [clinicAddressStreet, setclinicAddressStreet] = useState();
  const [clinicAddressCity, setclinicAddressCity] = useState();
  const [clinicAddressCountry, setclinicAddressCountry] = useState();

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

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleClinicLogoChange = async (file) => {
    setUnsavedChanges(true);
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

  const handleClinicFaviconChange = async (file) => {
    setUnsavedChanges(true);
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

  const handleClinicLogoDelete = () => {
    setclinicLogo();
  };

  const handleFaviconDelete = () => {
    setclinicFavicon();
  };

  const handleUpdateClinicDetailsSubmit = async () => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");

    let data = {
      clinic_logo: clinicLogo ? clinicLogo : undefined,
      clinic_favicon: clinicFavicon ? clinicFavicon : undefined,
      clinic_name: clinicName ? clinicName : undefined,
      clinic_phone_number: clinicPhoneNumber
        ? clinicPhoneNumber
        : clinicPhoneNumber,
      clinic_website: clinicWebsite ? clinicWebsite : undefined,
      clinic_address_state: clinicAddressState ? clinicAddressState : undefined,
      clinic_address_zip_code: clinicAddressZIPCode
        ? clinicAddressZIPCode
        : undefined,
      clinic_address_street: clinicAddressStreet
        ? clinicAddressStreet
        : undefined,
      clinic_address_city: clinicAddressCity
        ? clinicAddressCity
        : clinicAddressCity,
      clinic_address_country: clinicAddressCountry
        ? clinicAddressCountry
        : undefined,

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
      whatsapp_number: whatsappNumber ? whatsappNumber : undefined,
      instagram_url: instagramUrl ? instagramUrl : undefined,
      facebook_url: facebookUrl ? facebookUrl : undefined,
      x_url: xUrl ? xUrl : undefined,
      tiktok_url: tiktokUrl ? tiktokUrl : undefined,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/create-update-clinic/${loginUserDetails?.clinic_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          handleClinicDetails();
          setUnsavedChanges(false);
          openNotificationWithIcon(
            "success",
            "Settings",
            "Clinic details updated successfully"
          );
        })
        .catch((err) => {
          console.log(err?.response?.data);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
    }
    setbuttonLoader(false);
  };

  const handleClinicDetails = async () => {
    const token = localStorage.getItem("authToken");
    setpageloader(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-clinic-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          let temp = res?.data?.[0];
          setclinicLogo(temp?.clinic_logo ? temp?.clinic_logo : "");
          setclinicFavicon(temp?.clinic_favicon ? temp?.clinic_favicon : "");
          setclinicName(temp?.clinic_name ? temp?.clinic_name : "");
          setclinicPhoneNumber(
            temp?.clinic_phone_number ? temp?.clinic_phone_number : ""
          );
          setclinicWebsite(temp?.clinic_website ? temp?.clinic_website : "");
          setclinicAddressState(
            temp?.clinic_address_state ? temp?.clinic_address_state : ""
          );
          setclinicAddressZIPCode(
            temp?.clinic_address_zip_code ? temp?.clinic_address_zip_code : ""
          );
          setclinicAddressStreet(
            temp?.clinic_address_street ? temp?.clinic_address_street : ""
          );
          setclinicAddressCity(
            temp?.clinic_address_city ? temp?.clinic_address_city : ""
          );
          setclinicAddressCountry(
            temp?.clinic_address_country ? temp?.clinic_address_country : ""
          );

          setMondayFrom(temp?.monday_from ? temp?.monday_from : "");
          setMondayTo(temp?.monday_to ? temp?.monday_to : "");
          setMondayClosed(temp?.monday_closed === "true" ? true : false);
          setTuesdayFrom(temp?.tuesday_from ? temp?.tuesday_from : "");
          setTuesdayTo(temp?.tuesday_to ? temp?.tuesday_to : "");
          setTuesdayClosed(temp?.tuesday_closed === "true" ? true : false);
          setWednesdayFrom(temp?.wednesday_from ? temp?.wednesday_from : "");
          setWednesdayTo(temp?.wednesday_to ? temp?.wednesday_to : "");
          setWednesdayClosed(temp?.wednesday_closed === "true" ? true : false);
          setThursdayFrom(temp?.thursday_from ? temp?.thursday_from : "");
          setThursdayTo(temp?.thursday_to ? temp?.thursday_to : "");
          setThursdayClosed(temp?.thursday_closed === "true" ? true : false);
          setFridayFrom(temp?.friday_from ? temp?.friday_from : "");
          setFridayTo(temp?.friday_to ? temp?.friday_to : "");
          setFridayClosed(temp?.friday_closed === "true" ? true : false);
          setSaturdayFrom(temp?.saturday_from ? temp?.saturday_from : "");
          setSaturdayTo(temp?.saturday_to ? temp?.saturday_to : "");
          setSaturdayClosed(temp?.saturday_closed === "true" ? true : false);
          setSundayFrom(temp?.sunday_from ? temp?.sunday_from : "");
          setSundayTo(temp?.sunday_to ? temp?.sunday_to : "");
          setSundayClosed(temp?.sunday_closed === "true" ? true : false);
          setWhatsappNumber(temp?.whatsapp_number ? temp?.whatsapp_number : "");
          setInstagramUrl(temp?.instagram_url ? temp?.instagram_url : "");
          setFacebookUrl(temp?.facebook_url ? temp?.facebook_url : "");
          setXUrl(temp?.x_url ? temp?.x_url : "");
          setTiktokUrl(temp?.tiktok_url ? temp?.tiktok_url : "");
        })
        .catch((err) => {
          console.log(err);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    } catch (err) {
      console.log(err);
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
    }
    setpageloader(false);
  };

  const items = [
    {
      key: "1",
      label: "Genral",
      children: (
        <>
          {pageloader ? (
            <>
              <Skeleton
                paragraph={{
                  rows: 4,
                }}
              />
            </>
          ) : (
            <>
              <Card bordered={false} style={{ width: "100%" }}>
                <Row align="middle" gutter={[16, 16]}>
                  <Col span={12}>
                    <Typography style={{ fontWeight: 600 }}>
                      Clinic Logo
                    </Typography>
                    <Text className="custom-text1">
                      Upload a photo to personalize your account.
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Image
                        size={64}
                        style={{ width: 200, objectFit: "contain" }}
                        src={clinicLogo}
                        shape="square"
                      />
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleClinicLogoChange(file);
                          return false;
                        }}
                      >
                        <Button>Change</Button>
                      </Upload>
                      <Button
                        type="link"
                        danger
                        onClick={handleClinicLogoDelete}
                      >
                        Delete
                      </Button>
                    </Space>
                  </Col>
                </Row>
                <Divider />
                <Row align="middle" gutter={[16, 16]}>
                  <Col span={12}>
                    <Typography style={{ fontWeight: 600 }}>Favicon</Typography>
                    <Text className="custom-text1">
                      Upload a photo to personalize your account.
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Space>
                      <Avatar size={50} src={clinicFavicon} shape="square" />
                      <Upload
                        accept="image/*"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          handleClinicFaviconChange(file);
                          return false; // Prevent auto-upload
                        }}
                      >
                        <Button>Change</Button>
                      </Upload>
                      <Button type="link" danger onClick={handleFaviconDelete}>
                        Delete
                      </Button>
                    </Space>
                  </Col>
                </Row>
                <Divider />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <Typography style={{ fontWeight: 600 }}>
                      Clinic Name
                    </Typography>
                    <Text className="custom-text1">
                      Your name as it will appear across your profile.
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Typography style={{ fontWeight: 600 }}>Name</Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Input
                        placeholder="Enter clinic name"
                        value={clinicName}
                        onChange={(e) => {
                          setclinicName(e?.target?.value);
                          setUnsavedChanges(true);
                        }}
                        style={{ width: "100%", margin: 1 }}
                      />
                    </div>
                  </Col>
                </Row>
                <Divider />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <Typography style={{ fontWeight: 600 }}>
                      Clinic Phone Number
                    </Typography>
                    <Text className="custom-text1">
                      Your name as it will appear across your profile.
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Typography>Phone Number</Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Input
                        value={clinicPhoneNumber}
                        onChange={(e) => {
                          setclinicPhoneNumber(e?.target?.value);
                          setUnsavedChanges(true);
                        }}
                        placeholder="Enter phone number"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Col>
                </Row>
                <Divider />
                <Row style={{ display: "flex", alignItems: "center" }}>
                  <Col span={12}>
                    <Typography style={{ fontWeight: 600 }}>
                      Clinic Website
                    </Typography>
                    <Text className="custom-text1">
                      Your name as it will appear across your profile.
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Typography>Website</Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Input
                        onChange={(e) => {
                          setclinicWebsite(e?.target?.value);
                          setUnsavedChanges(true);
                        }}
                        value={clinicWebsite}
                        placeholder="Enter website url"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row justify="start" style={{ padding: "15px 0px 0px 0px" }}>
                  <Col>
                    <Space align="center">
                      <Button
                        type="primary"
                        loading={buttonLoader}
                        onClick={handleUpdateClinicDetailsSubmit}
                        disabled={!unsavedChanges}
                        style={{
                          backgroundColor: "#3900DB",
                          borderColor: "#3900DB",
                          color: "#fff",
                        }}
                      >
                        Save
                      </Button>
                      {unsavedChanges && (
                        <Text type="danger">You have unsaved changes</Text>
                      )}
                    </Space>
                  </Col>
                </Row>
              </Card>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Clinic Details",
      children: (
        <>
          <Card
            bordered={false}
            style={{ width: "100%", overflow: "auto", height: "75vh" }}
          >
            <Row style={{ display: "flex", alignItems: "flex-start" }}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Clinic Address
                </Typography>
                <Text className="custom-text1">
                  Enter the full address for patient visits and correspondence.
                </Text>
              </Col>
              <Col span={12}>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={11}>
                    <Typography className="custom-text1">State</Typography>
                    <Input
                      value={clinicAddressState}
                      onChange={(e) => {
                        setclinicAddressState(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                      placeholder="Enter State"
                      style={{ width: "100%", margin: 1 }}
                    />
                  </Col>
                  <Col span={11}>
                    <Typography className="custom-text1">ZIP Code</Typography>
                    <Input
                      value={clinicAddressZIPCode}
                      onChange={(e) => {
                        setclinicAddressZIPCode(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                      placeholder="Enter ZIP Code"
                      style={{ width: "100%", margin: 1 }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={11}>
                    <Typography className="custom-text1">
                      Street Address
                    </Typography>
                    <Input
                      value={clinicAddressStreet}
                      onChange={(e) => {
                        setclinicAddressStreet(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                      placeholder="Enter Street Address"
                      style={{ width: "100%", margin: 1 }}
                    />
                  </Col>
                  <Col span={11}>
                    <Typography className="custom-text1">City</Typography>
                    <Input
                      value={clinicAddressCity}
                      onChange={(e) => {
                        setclinicAddressCity(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                      placeholder="Enter City"
                      style={{ width: "100%", margin: 1 }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={24}>
                    <Typography className="custom-text1">Country</Typography>
                    <Input
                      value={clinicAddressCountry}
                      onChange={(e) => {
                        setclinicAddressCountry(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                      placeholder="Enter Country"
                      style={{ width: "100%", margin: 1 }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider />
            <Row style={{ display: "flex", alignItems: "flex-start" }}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Weekly Operating Hours
                </Typography>
                <Text className="custom-text1">
                  Specify your clinic’s opening and closing times for each day.
                </Text>
              </Col>
              <Col span={12}>
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
                        checked={mondayClosed}
                        onChange={(e) => {
                          setMondayClosed(e);
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                          setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
                              setUnsavedChanges(true);
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
            <Divider />
            <Row style={{ display: "flex", alignItems: "flex-start" }}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Social Media Links
                </Typography>
                <Text className="custom-text1">
                  Add links to your social profiles to enhance patient
                  engagement and visibility.
                </Text>
              </Col>
              <Col span={12}>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={24}>
                    <Typography className="custom-text1">WhatsApp</Typography>
                    <Input
                      prefix={<WhatsAppIconSvg />}
                      placeholder="Enter WhatsApp Number"
                      style={{ width: "100%", margin: 1 }}
                      value={whatsappNumber}
                      onChange={(e) => {
                        setWhatsappNumber(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={24}>
                    <Typography className="custom-text1">Instagram</Typography>
                    <Input
                      prefix={<InstagramIconSvg />}
                      placeholder="Enter Instagram URL"
                      style={{ width: "100%", margin: 1 }}
                      value={instagramUrl}
                      onChange={(e) => {
                        setInstagramUrl(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={24}>
                    <Typography className="custom-text1">Facebook</Typography>
                    <Input
                      prefix={<FacebookIconSvg />}
                      placeholder="Enter Facebook URL"
                      style={{ width: "100%", margin: 1 }}
                      value={facebookUrl}
                      onChange={(e) => {
                        setFacebookUrl(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={24}>
                    <Typography className="custom-text1">X</Typography>
                    <Input
                      prefix={<TwitterIconSvg />}
                      placeholder="Enter X URL"
                      style={{ width: "100%", margin: 1 }}
                      value={xUrl}
                      onChange={(e) => {
                        setXUrl(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                    padding: "5px 0px",
                  }}
                >
                  <Col span={24}>
                    <Typography className="custom-text1">Tiktok</Typography>
                    <Input
                      prefix={<TiktokIconSvg />}
                      placeholder="Enter Tiktok URL"
                      style={{ width: "100%", margin: 1 }}
                      value={tiktokUrl}
                      onChange={(e) => {
                        setTiktokUrl(e?.target?.value);
                        setUnsavedChanges(true);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="start" style={{ padding: "15px 0px 0px 0px" }}>
              <Col>
                <Space align="center">
                  <Button
                    type="primary"
                    onClick={handleUpdateClinicDetailsSubmit}
                    loading={buttonLoader}
                    disabled={!unsavedChanges}
                    style={{
                      backgroundColor: "#3900DB",
                      borderColor: "#3900DB",
                      color: "#fff",
                    }}
                  >
                    Save
                  </Button>
                  {unsavedChanges && (
                    <Text type="danger">You have unsaved changes</Text>
                  )}
                </Space>
              </Col>
            </Row>
          </Card>
        </>
      ),
    },
    {
      key: "3",
      label: "Dialer",
      children: (
        <>
          <>
            <Card bordered={false} style={{ width: "100%" }}>
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Dialer Setup
                  </Typography>
                  <Text className="custom-text1">
                    To set up a dialer for outbound calling
                  </Text>
                </Col>
                <Col span={12}>
                  <Input disabled value={"+13083050002"}></Input>
                </Col>
              </Row>
            </Card>
          </>
        </>
      ),
    },
  ];

  useEffect(() => {
    handleClinicDetails();
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} style={{ width: "100%" }} />
    </>
  );
};

export default ClinicDetails;
