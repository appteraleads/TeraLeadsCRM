import React from "react";

export const MyAccountSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1667 7.50016C14.1667 6.34933 13.7 5.30766 12.9467 4.55433C12.1925 3.80016 11.1508 3.3335 10 3.3335C8.84917 3.3335 7.8075 3.80016 7.05333 4.55433C6.3 5.30766 5.83333 6.34933 5.83333 7.50016C5.83333 8.651 6.3 9.69266 7.05333 10.446C7.8075 11.2002 8.84917 11.6668 10 11.6668C11.1508 11.6668 12.1925 11.2002 12.9467 10.446C13.3342 10.0597 13.6415 9.60049 13.8509 9.09492C14.0602 8.58935 14.1676 8.04737 14.1667 7.50016ZM5 15.8335C5 16.6668 6.875 17.5002 10 17.5002C12.9317 17.5002 15 16.6668 15 15.8335C15 14.1668 13.0383 12.5002 10 12.5002C6.875 12.5002 5 14.1668 5 15.8335Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const ClinicDetailsSVG = (data) => {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99967 12.1665C7.23579 12.1665 7.43384 12.0865 7.59384 11.9265C7.75384 11.7665 7.83356 11.5687 7.83301 11.3332V8.83317C7.83301 8.59706 7.75301 8.39928 7.59301 8.23984C7.43301 8.08039 7.23523 8.00039 6.99967 7.99984C6.76412 7.99928 6.56634 8.07928 6.40634 8.23984C6.24634 8.40039 6.16634 8.59817 6.16634 8.83317V11.3332C6.16634 11.5693 6.24634 11.7673 6.40634 11.9273C6.56634 12.0873 6.76412 12.1671 6.99967 12.1665ZM6.99967 6.33317C7.23579 6.33317 7.43384 6.25317 7.59384 6.09317C7.75384 5.93317 7.83356 5.73539 7.83301 5.49984C7.83245 5.26428 7.75245 5.0665 7.59301 4.9065C7.43356 4.7465 7.23579 4.6665 6.99967 4.6665C6.76356 4.6665 6.56579 4.7465 6.40634 4.9065C6.2469 5.0665 6.1669 5.26428 6.16634 5.49984C6.16579 5.73539 6.24579 5.93345 6.40634 6.094C6.5669 6.25456 6.76467 6.33428 6.99967 6.33317ZM1.99967 15.4998C1.54134 15.4998 1.14912 15.3368 0.823008 15.0107C0.496897 14.6846 0.333563 14.2921 0.333008 13.8332V6.33317C0.333008 6.06928 0.392174 5.81928 0.510508 5.58317C0.628841 5.34706 0.791897 5.15261 0.999675 4.99984L5.99967 1.24984C6.29134 1.02762 6.62467 0.916504 6.99967 0.916504C7.37467 0.916504 7.70801 1.02762 7.99967 1.24984L12.9997 4.99984C13.208 5.15261 13.3713 5.34706 13.4897 5.58317C13.608 5.81928 13.6669 6.06928 13.6663 6.33317V13.8332C13.6663 14.2915 13.503 14.684 13.1763 15.0107C12.8497 15.3373 12.4575 15.5004 11.9997 15.4998H1.99967Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const TeamSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.875C10.663 6.875 11.2989 6.61161 11.7678 6.14277C12.2366 5.67393 12.5 5.03804 12.5 4.375C12.5 3.71196 12.2366 3.07607 11.7678 2.60723C11.2989 2.13839 10.663 1.875 10 1.875C9.33696 1.875 8.70107 2.13839 8.23223 2.60723C7.76339 3.07607 7.5 3.71196 7.5 4.375C7.5 5.03804 7.76339 5.67393 8.23223 6.14277C8.70107 6.61161 9.33696 6.875 10 6.875ZM6.25 4.6875C6.25 4.97477 6.19342 5.25922 6.08349 5.52462C5.97355 5.79002 5.81242 6.03117 5.6093 6.2343C5.40617 6.43742 5.16502 6.59855 4.89962 6.70849C4.63422 6.81842 4.34977 6.875 4.0625 6.875C3.77523 6.875 3.49078 6.81842 3.22538 6.70849C2.95998 6.59855 2.71883 6.43742 2.5157 6.2343C2.31258 6.03117 2.15145 5.79002 2.04151 5.52462C1.93158 5.25922 1.875 4.97477 1.875 4.6875C1.875 4.10734 2.10547 3.55094 2.5157 3.1407C2.92594 2.73047 3.48234 2.5 4.0625 2.5C4.64266 2.5 5.19906 2.73047 5.6093 3.1407C6.01953 3.55094 6.25 4.10734 6.25 4.6875ZM18.125 4.6875C18.125 4.97477 18.0684 5.25922 17.9585 5.52462C17.8486 5.79002 17.6874 6.03117 17.4843 6.2343C17.2812 6.43742 17.04 6.59855 16.7746 6.70849C16.5092 6.81842 16.2248 6.875 15.9375 6.875C15.6502 6.875 15.3658 6.81842 15.1004 6.70849C14.835 6.59855 14.5938 6.43742 14.3907 6.2343C14.1876 6.03117 14.0264 5.79002 13.9165 5.52462C13.8066 5.25922 13.75 4.97477 13.75 4.6875C13.75 4.10734 13.9805 3.55094 14.3907 3.1407C14.8009 2.73047 15.3573 2.5 15.9375 2.5C16.5177 2.5 17.0741 2.73047 17.4843 3.1407C17.8945 3.55094 18.125 4.10734 18.125 4.6875ZM5.86062 8.125C5.50484 8.56795 5.31141 9.11935 5.3125 9.6875V14.375C5.3125 15.1469 5.49875 15.875 5.82937 16.5169C5.35304 16.7673 4.8201 16.8905 4.28217 16.8746C3.74424 16.8586 3.21956 16.7039 2.75894 16.4256C2.29832 16.1473 1.91738 15.7548 1.65302 15.286C1.38866 14.8173 1.24984 14.2882 1.25 13.75V9.6875C1.25 9.2731 1.41462 8.87567 1.70765 8.58265C2.00067 8.28962 2.3981 8.125 2.8125 8.125H5.86062ZM14.1706 16.5169C14.5107 15.8541 14.6878 15.1199 14.6875 14.375V9.6875C14.6875 9.09625 14.4825 8.55312 14.1394 8.125H17.1875C17.6019 8.125 17.9993 8.28962 18.2924 8.58265C18.5854 8.87567 18.75 9.2731 18.75 9.6875V13.75C18.7502 14.2882 18.6113 14.8173 18.347 15.286C18.0826 15.7548 17.7017 16.1473 17.2411 16.4256C16.7804 16.7039 16.2558 16.8586 15.7178 16.8746C15.1799 16.8905 14.647 16.7673 14.1706 16.5169ZM7.8125 8.125C7.3981 8.125 7.00067 8.28962 6.70765 8.58265C6.41462 8.87567 6.25 9.2731 6.25 9.6875V14.375C6.25 15.3696 6.64509 16.3234 7.34835 17.0267C8.05161 17.7299 9.00544 18.125 10 18.125C10.9946 18.125 11.9484 17.7299 12.6517 17.0267C13.3549 16.3234 13.75 15.3696 13.75 14.375V9.6875C13.75 9.2731 13.5854 8.87567 13.2924 8.58265C12.9993 8.28962 12.6019 8.125 12.1875 8.125H7.8125Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const BillingPlanSVG = (data) => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.666992 0.0415039C0.501232 0.0415039 0.342261 0.107352 0.22505 0.224562C0.10784 0.341772 0.0419922 0.500744 0.0419922 0.666504C0.0419922 0.832264 0.10784 0.991236 0.22505 1.10845C0.342261 1.22566 0.501232 1.2915 0.666992 1.2915H2.33366V9.23067C2.33366 10.3473 2.33366 10.9057 2.55699 11.3982C2.78033 11.8907 3.20033 12.2582 4.04116 12.994L5.70783 14.4523C7.27699 15.8248 8.06116 16.5107 9.00033 16.5107C9.93949 16.5107 10.7245 15.8248 12.2928 14.4523L13.9595 12.994C14.7995 12.2582 15.2203 11.8907 15.4428 11.3982C15.667 10.9065 15.667 10.3482 15.667 9.2315V1.2915H17.3337C17.4994 1.2915 17.6584 1.22566 17.7756 1.10845C17.8928 0.991236 17.9587 0.832264 17.9587 0.666504C17.9587 0.500744 17.8928 0.341772 17.7756 0.224562C17.6584 0.107352 17.4994 0.0415039 17.3337 0.0415039H0.666992ZM6.08366 9.20817C5.9179 9.20817 5.75893 9.27402 5.64172 9.39123C5.52451 9.50844 5.45866 9.66741 5.45866 9.83317C5.45866 9.99893 5.52451 10.1579 5.64172 10.2751C5.75893 10.3923 5.9179 10.4582 6.08366 10.4582H11.917C12.0828 10.4582 12.2417 10.3923 12.3589 10.2751C12.4761 10.1579 12.542 9.99893 12.542 9.83317C12.542 9.66741 12.4761 9.50844 12.3589 9.39123C12.2417 9.27402 12.0828 9.20817 11.917 9.20817H6.08366ZM5.45866 5.6665C5.45866 5.50074 5.52451 5.34177 5.64172 5.22456C5.75893 5.10735 5.9179 5.0415 6.08366 5.0415H11.917C12.0828 5.0415 12.2417 5.10735 12.3589 5.22456C12.4761 5.34177 12.542 5.50074 12.542 5.6665C12.542 5.83226 12.4761 5.99124 12.3589 6.10845C12.2417 6.22566 12.0828 6.2915 11.917 6.2915H6.08366C5.9179 6.2915 5.75893 6.22566 5.64172 6.10845C5.52451 5.99124 5.45866 5.83226 5.45866 5.6665Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const NotificationsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33301 15.8332V14.1665H4.99967V8.33317C4.99967 7.18039 5.3469 6.15623 6.04134 5.26067C6.73579 4.36512 7.63856 3.77817 8.74967 3.49984V2.91651C8.74967 2.56928 8.87134 2.27428 9.11467 2.03151C9.35801 1.78873 9.65301 1.66706 9.99967 1.66651C10.3463 1.66595 10.6416 1.78762 10.8855 2.03151C11.1294 2.27539 11.2508 2.57039 11.2497 2.91651V3.49984C12.3608 3.77762 13.2636 4.36456 13.958 5.26067C14.6525 6.15678 14.9997 7.18095 14.9997 8.33317V14.1665H16.6663V15.8332H3.33301ZM9.99967 18.3332C9.54134 18.3332 9.14912 18.1701 8.82301 17.844C8.4969 17.5179 8.33356 17.1254 8.33301 16.6665H11.6663C11.6663 17.1248 11.5033 17.5173 11.1772 17.844C10.8511 18.1707 10.4586 18.3337 9.99967 18.3332Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const AICallsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8919 10.0085C16.0004 10.0238 16.1048 10.0604 16.1991 10.1161C16.2934 10.1719 16.3759 10.2456 16.4417 10.3333C16.5075 10.4209 16.5553 10.5206 16.5825 10.6268C16.6097 10.7329 16.6157 10.8434 16.6002 10.9518C16.3913 12.3968 15.7141 13.7334 14.6724 14.7564C13.6307 15.7795 12.2821 16.4324 10.8335 16.6152V17.5002C10.8335 17.7212 10.7457 17.9331 10.5894 18.0894C10.4332 18.2457 10.2212 18.3335 10.0002 18.3335C9.77918 18.3335 9.56722 18.2457 9.41094 18.0894C9.25466 17.9331 9.16686 17.7212 9.16686 17.5002V16.6152C7.7185 16.4321 6.37017 15.7791 5.32866 14.7561C4.28716 13.7331 3.60999 12.3967 3.40102 10.9518C3.36964 10.733 3.42646 10.5107 3.55899 10.3338C3.69151 10.1569 3.88889 10.0399 4.10769 10.0085C4.3265 9.97711 4.5488 10.0339 4.72571 10.1665C4.90262 10.299 5.01964 10.4964 5.05102 10.7152C5.22337 11.9048 5.81848 12.9926 6.72737 13.7793C7.63626 14.566 8.79811 14.999 10.0002 14.999C11.2023 14.999 12.3641 14.566 13.273 13.7793C14.1819 12.9926 14.777 11.9048 14.9494 10.7152C14.9649 10.6068 15.0016 10.5026 15.0574 10.4084C15.1132 10.3143 15.187 10.232 15.2746 10.1664C15.3622 10.1008 15.4619 10.0531 15.568 10.026C15.674 9.99888 15.7835 9.99294 15.8919 10.0085ZM10.0002 1.66683C10.6827 1.66683 11.3269 1.831 11.8952 2.12183C11.518 2.38716 11.2215 2.75166 11.0386 3.17501C10.8556 3.59836 10.7934 4.06406 10.8587 4.5206C10.924 4.97714 11.1143 5.40672 11.4085 5.76182C11.7028 6.11692 12.0896 6.38371 12.526 6.53266L12.841 6.641C12.9614 6.68206 13.0707 6.75012 13.1607 6.83996C13.2507 6.9298 13.3189 7.03905 13.3602 7.15933L13.4677 7.47433C13.6094 7.891 13.8544 8.251 14.1669 8.53016V10.0002C14.1669 11.1052 13.7279 12.165 12.9465 12.9464C12.1651 13.7278 11.1053 14.1668 10.0002 14.1668C8.89512 14.1668 7.83531 13.7278 7.05391 12.9464C6.27251 12.165 5.83352 11.1052 5.83352 10.0002V5.8335C5.83352 4.72843 6.27251 3.66862 7.05391 2.88722C7.83531 2.10582 8.89512 1.66683 10.0002 1.66683ZM15.8335 0.833496C15.9894 0.833496 16.1422 0.877228 16.2745 0.959722C16.4068 1.04222 16.5133 1.16016 16.5819 1.30016L16.6219 1.39766L16.7302 1.71266C16.8445 2.04782 17.0288 2.35485 17.2707 2.61345C17.5126 2.87204 17.8067 3.07629 18.1335 3.21266L18.2877 3.271L18.6027 3.3785C18.7587 3.43171 18.8954 3.53 18.9955 3.66091C19.0957 3.79182 19.1547 3.94949 19.1653 4.11398C19.1758 4.27846 19.1373 4.44237 19.0547 4.58498C18.972 4.72759 18.849 4.8425 18.701 4.91516L18.6027 4.95516L18.2877 5.0635C17.9525 5.17783 17.6455 5.36206 17.3869 5.60399C17.1283 5.84592 16.9241 6.14002 16.7877 6.46683L16.7294 6.621L16.6219 6.936C16.5685 7.09194 16.4702 7.22858 16.3392 7.32863C16.2083 7.42868 16.0506 7.48766 15.8861 7.49809C15.7216 7.50853 15.5577 7.46996 15.4152 7.38726C15.2726 7.30457 15.1578 7.18145 15.0852 7.0335L15.0452 6.936L14.9369 6.621C14.8225 6.28584 14.6383 5.9788 14.3964 5.72021C14.1544 5.46162 13.8603 5.25737 13.5335 5.121L13.3794 5.06266L13.0644 4.95516C12.9084 4.90194 12.7717 4.80366 12.6715 4.67275C12.5714 4.54183 12.5123 4.38417 12.5018 4.21968C12.4913 4.0552 12.5298 3.89129 12.6124 3.74868C12.695 3.60607 12.8181 3.49116 12.966 3.4185L13.0644 3.3785L13.3794 3.27016C13.7145 3.15583 14.0216 2.9716 14.2801 2.72967C14.5387 2.48774 14.743 2.19363 14.8794 1.86683L14.9377 1.71266L15.0452 1.39766C15.1013 1.23315 15.2075 1.09032 15.3489 0.989154C15.4902 0.887991 15.6597 0.833565 15.8335 0.833496Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const ConversationalAISVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2612 6.77342L17.0562 7.24509C17.0241 7.32189 16.9701 7.3875 16.9008 7.43365C16.8316 7.4798 16.7502 7.50442 16.667 7.50442C16.5838 7.50442 16.5024 7.4798 16.4332 7.43365C16.3639 7.3875 16.3099 7.32189 16.2778 7.24509L16.0728 6.77342C15.7124 5.93902 15.0523 5.27002 14.2228 4.89842L13.5903 4.61592C13.5136 4.58062 13.4486 4.52406 13.403 4.45294C13.3575 4.38183 13.3332 4.29913 13.3332 4.21467C13.3332 4.13021 13.3575 4.04751 13.403 3.9764C13.4486 3.90528 13.5136 3.84872 13.5903 3.81342L14.1878 3.54759C15.0382 3.1654 15.7095 2.47166 16.0637 1.60925L16.2745 1.10009C16.3055 1.02122 16.3595 0.953502 16.4295 0.905775C16.4995 0.858047 16.5823 0.83252 16.667 0.83252C16.7517 0.83252 16.8345 0.858047 16.9045 0.905775C16.9745 0.953502 17.0285 1.02122 17.0595 1.10009L17.2703 1.60842C17.6241 2.47098 18.2952 3.16503 19.1453 3.54759L19.7437 3.81425C19.8202 3.84965 19.8849 3.90621 19.9303 3.97723C19.9757 4.04826 19.9998 4.13079 19.9998 4.21509C19.9998 4.29938 19.9757 4.38192 19.9303 4.45294C19.8849 4.52397 19.8202 4.58052 19.7437 4.61592L19.1103 4.89759C18.281 5.26956 17.6212 5.93886 17.2612 6.77342ZM16.667 9.16675C17.2326 9.1672 17.7942 9.07168 18.3278 8.88425C18.3317 8.9787 18.3337 9.07287 18.3337 9.16675C18.3337 10.9349 17.6313 12.6306 16.381 13.8808C15.1308 15.131 13.4351 15.8334 11.667 15.8334V18.7501C7.50033 17.0834 1.66699 14.5834 1.66699 9.16675C1.66699 7.39864 2.36937 5.70295 3.61961 4.45271C4.86986 3.20247 6.56555 2.50009 8.33366 2.50009H11.667C11.7614 2.50009 11.8556 2.50203 11.9495 2.50592C11.6839 3.26002 11.6031 4.06682 11.7137 4.85862C11.8243 5.65043 12.1232 6.40416 12.5853 7.0566C13.0474 7.70904 13.6592 8.24115 14.3694 8.60832C15.0796 8.97548 15.8675 9.16698 16.667 9.16675Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const AppointmentsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.45859 3.3335C6.45859 3.16774 6.39275 3.00876 6.27554 2.89155C6.15832 2.77434 5.99935 2.7085 5.83359 2.7085C5.66783 2.7085 5.50886 2.77434 5.39165 2.89155C5.27444 3.00876 5.20859 3.16774 5.20859 3.3335V4.84683C4.60064 4.93304 4.03761 5.21584 3.60545 5.65206C3.1733 6.08827 2.89578 6.65393 2.81526 7.26266L2.74276 7.80683C2.73054 7.8985 2.71887 7.99072 2.70776 8.0835C2.70104 8.14123 2.70665 8.19973 2.72421 8.25514C2.74177 8.31054 2.77089 8.36159 2.80964 8.40491C2.84839 8.44823 2.89589 8.48283 2.94901 8.50644C3.00212 8.53004 3.05964 8.5421 3.11776 8.54183H16.8836C16.9417 8.5421 16.9992 8.53004 17.0523 8.50644C17.1055 8.48283 17.153 8.44823 17.1917 8.40491C17.2305 8.36159 17.2596 8.31054 17.2771 8.25514C17.2947 8.19973 17.3003 8.14123 17.2936 8.0835L17.2586 7.80683L17.1861 7.26266C17.1056 6.65393 16.8281 6.08827 16.3959 5.65206C15.9637 5.21584 15.4007 4.93304 14.7928 4.84683V3.3335C14.7928 3.16774 14.7269 3.00876 14.6097 2.89155C14.4925 2.77434 14.3335 2.7085 14.1678 2.7085C14.002 2.7085 13.843 2.77434 13.7258 2.89155C13.6086 3.00876 13.5428 3.16774 13.5428 3.3335V4.7235C11.1863 4.51403 8.81589 4.51403 6.45943 4.7235L6.45859 3.3335ZM17.4544 10.1885C17.4505 10.0816 17.4052 9.9805 17.3281 9.90647C17.2509 9.83244 17.148 9.79133 17.0411 9.79183H2.95943C2.85251 9.79133 2.74959 9.83244 2.67244 9.90647C2.5953 9.9805 2.54999 10.0816 2.54609 10.1885C2.49682 11.6966 2.58889 13.2059 2.82109 14.6968C2.90668 15.2461 3.1723 15.7514 3.57624 16.1333C3.98018 16.5152 4.49955 16.7521 5.05276 16.8068L6.04693 16.9052C8.67609 17.1635 11.3244 17.1635 13.9536 16.9052L14.9478 16.8068C15.501 16.7521 16.0203 16.5152 16.4243 16.1333C16.8282 15.7514 17.0938 15.2461 17.1794 14.6968C17.4116 13.2059 17.5037 11.6966 17.4544 10.1885Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const ConversationsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.00001 10.4998C3.00001 6.35804 6.35805 3 10.4998 3C14.6416 3 17.9996 6.35804 17.9996 10.4998C17.9996 14.6416 14.6416 17.9996 10.4998 17.9996C9.27118 18.0014 8.06108 17.7 6.97679 17.1222L3.99561 17.9703C3.86178 18.0083 3.72024 18.0099 3.58559 17.9749C3.45095 17.9399 3.32809 17.8696 3.22972 17.7712C3.13134 17.6728 3.06102 17.55 3.02602 17.4153C2.99103 17.2807 2.99262 17.1391 3.03063 17.0053L3.87811 14.0241C3.29987 12.9395 2.99825 11.7289 3.00001 10.4998ZM7.6874 9.0936C7.6874 9.35235 7.89739 9.56234 8.15613 9.56234H12.8435C12.9678 9.56234 13.0871 9.51296 13.175 9.42505C13.2629 9.33715 13.3123 9.21792 13.3123 9.0936C13.3123 8.96929 13.2629 8.85006 13.175 8.76216C13.0871 8.67425 12.9678 8.62487 12.8435 8.62487H8.15613C8.03182 8.62487 7.91259 8.67425 7.82469 8.76216C7.73678 8.85006 7.6874 8.96929 7.6874 9.0936ZM8.15613 11.4373C8.03182 11.4373 7.91259 11.4867 7.82469 11.5746C7.73678 11.6625 7.6874 11.7817 7.6874 11.906C7.6874 12.0304 7.73678 12.1496 7.82469 12.2375C7.91259 12.3254 8.03182 12.3748 8.15613 12.3748H10.9686C11.0929 12.3748 11.2121 12.3254 11.3 12.2375C11.3879 12.1496 11.4373 12.0304 11.4373 11.906C11.4373 11.7817 11.3879 11.6625 11.3 11.5746C11.2121 11.4867 11.0929 11.4373 10.9686 11.4373H8.15613Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const LeadsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1942 1.66652H8.06333C6.79581 1.66754 5.5779 2.15927 4.66501 3.03861C3.75211 3.91795 3.21513 5.11659 3.16667 6.38319H2.5C2.33424 6.38319 2.17527 6.44904 2.05806 6.56625C1.94085 6.68346 1.875 6.84243 1.875 7.00819C1.875 7.17395 1.94085 7.33292 2.05806 7.45013C2.17527 7.56734 2.33424 7.63319 2.5 7.63319H3.15833V12.3749H2.525C2.35924 12.3749 2.20027 12.4407 2.08306 12.5579C1.96585 12.6751 1.9 12.8341 1.9 12.9999C1.9 13.1656 1.96585 13.3246 2.08306 13.4418C2.20027 13.559 2.35924 13.6249 2.525 13.6249H3.19167C3.2412 14.8903 3.77879 16.0875 4.69168 16.9653C5.60458 17.8431 6.82189 18.3333 8.08833 18.3332H13.2192C13.8637 18.3333 14.5018 18.2064 15.0973 17.9597C15.6927 17.7131 16.2336 17.3515 16.6892 16.8957C17.1448 16.4398 17.5062 15.8987 17.7525 15.3031C17.9989 14.7076 18.1254 14.0693 18.125 13.4249V6.57486C18.1239 5.9287 17.9955 5.28909 17.747 4.69261C17.4985 4.09613 17.1349 3.55448 16.677 3.09862C16.219 2.64276 15.6757 2.28165 15.0781 2.03591C14.4805 1.79018 13.8403 1.66466 13.1942 1.66652ZM10.9617 4.94152C11.3439 4.94129 11.7214 5.02597 12.0669 5.18943C12.4124 5.35289 12.7173 5.59106 12.9596 5.88673C13.2018 6.18239 13.3754 6.52818 13.4677 6.8991C13.56 7.27001 13.5687 7.6568 13.4933 8.03152C13.4183 8.40605 13.2611 8.75926 13.0331 9.06573C12.8051 9.37219 12.512 9.62429 12.1748 9.80385C11.8377 9.98342 11.4649 10.086 11.0834 10.1042C10.7018 10.1224 10.321 10.0557 9.96833 9.90902C9.57637 9.74556 9.23075 9.48798 8.96207 9.15909C8.69339 8.8302 8.50993 8.44015 8.42794 8.02345C8.34596 7.60675 8.36796 7.17627 8.49202 6.77011C8.61607 6.36395 8.83835 5.99463 9.13917 5.69486C9.62315 5.21263 10.2785 4.94176 10.9617 4.94152ZM13.8775 14.5832C13.7117 14.5832 13.5528 14.5173 13.4356 14.4001C13.3183 14.2829 13.2525 14.124 13.2525 13.9582C13.2525 12.9499 11.9942 12.0832 10.9617 12.0832C9.92917 12.0832 8.68 12.9165 8.68 13.9582C8.68 14.124 8.61415 14.2829 8.49694 14.4001C8.37973 14.5173 8.22076 14.5832 8.055 14.5832C7.88924 14.5832 7.73027 14.5173 7.61306 14.4001C7.49585 14.2829 7.43 14.124 7.43 13.9582C7.43 12.1665 9.29667 10.8332 10.9617 10.8332C12.6283 10.8332 14.5017 12.1665 14.5017 13.9582C14.4995 14.1233 14.433 14.281 14.3162 14.3977C14.1995 14.5145 14.0426 14.581 13.8775 14.5832Z"
        fill={data?.color}
      />
      <path
        d="M12.2946 7.51643C12.2968 7.87005 12.1585 8.21007 11.91 8.46168C11.6615 8.71329 11.3232 8.85589 10.9696 8.8581C10.616 8.86031 10.276 8.72195 10.0244 8.47347C9.77276 8.22498 9.63017 7.88672 9.62796 7.5331C9.62575 7.17948 9.7641 6.83946 10.0126 6.58785C10.2611 6.33624 10.5993 6.19364 10.953 6.19143C11.3066 6.18922 11.6466 6.32758 11.8982 6.57606C12.1498 6.82455 12.2924 7.16281 12.2946 7.51643Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const CampaignsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.6603 3.1049C15.9708 2.99176 16.3071 2.96961 16.6297 3.04103C16.9523 3.11245 17.2479 3.27448 17.4816 3.50808C17.7153 3.74167 17.8775 4.03713 17.949 4.35972C18.0206 4.68231 17.9986 5.01863 17.8856 5.32915L14.0564 16.8061C13.9633 17.0882 13.7993 17.3416 13.5802 17.5421C13.3611 17.7426 13.0942 17.8836 12.805 17.9515C12.5165 18.0216 12.2148 18.0156 11.9293 17.9341C11.6438 17.8526 11.3844 17.6984 11.1765 17.4865L9.12149 15.4411L6.96366 16.5576C6.88095 16.6004 6.78847 16.621 6.69537 16.6173C6.60227 16.6135 6.51177 16.5855 6.43279 16.5361C6.35382 16.4866 6.2891 16.4174 6.24504 16.3353C6.20097 16.2532 6.17908 16.1611 6.18153 16.0679L6.27046 12.6565L13.8186 7.17412C13.8898 7.12241 13.9501 7.05719 13.9961 6.98217C14.042 6.90716 14.0728 6.82382 14.0866 6.73691C14.1004 6.65001 14.0969 6.56124 14.0764 6.47568C14.0558 6.39012 14.0187 6.30944 13.967 6.23824C13.9152 6.16705 13.85 6.10673 13.775 6.06075C13.7 6.01476 13.6166 5.984 13.5297 5.97022C13.4428 5.95644 13.3541 5.95991 13.2685 5.98044C13.1829 6.00097 13.1023 6.03814 13.0311 6.08985L5.35547 11.6655L3.50193 9.81194C3.30217 9.61212 3.15489 9.36603 3.0732 9.09555C2.99152 8.82507 2.97796 8.53859 3.03372 8.2616C3.08979 7.95878 3.22542 7.67633 3.4267 7.44324C3.62797 7.21014 3.88764 7.0348 4.17906 6.93519H4.18227L15.6592 3.10382L15.6603 3.1049Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const AutomationsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 12.4999H5L10.8333 0.833252V7.49992H15L9.16667 19.1666V12.4999Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const ReportsSVG = (data) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6663 6.66675L11.6663 1.66675H4.99967C4.55765 1.66675 4.13372 1.84234 3.82116 2.1549C3.5086 2.46746 3.33301 2.89139 3.33301 3.33341V16.6667C3.33301 17.1088 3.5086 17.5327 3.82116 17.8453C4.13372 18.1578 4.55765 18.3334 4.99967 18.3334H14.9997C15.4417 18.3334 15.8656 18.1578 16.1782 17.8453C16.4907 17.5327 16.6663 17.1088 16.6663 16.6667V6.66675ZM7.49967 15.8334H5.83301V8.33341H7.49967V15.8334ZM10.833 15.8334H9.16634V10.8334H10.833V15.8334ZM14.1663 15.8334H12.4997V13.3334H14.1663V15.8334ZM11.6663 7.50008H10.833V3.33341L14.9997 7.50008H11.6663Z"
        fill={data?.color}
      />
    </svg>
  );
};

export const SettingsSVG = (data) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="lets-icons:setting-alt-line">
        <g id="Group">
          <path
            id="Vector"
            d="M3.08402 13.9453C2.55502 12.9953 2.29102 12.5193 2.29102 12.0003C2.29102 11.4813 2.55502 11.0063 3.08402 10.0563L4.43202 7.63025L5.85802 5.24925C6.41702 4.31625 6.69602 3.84925 7.14502 3.58925C7.59502 3.33025 8.13801 3.32225 9.22501 3.30425L12.002 3.26025L14.777 3.30425C15.865 3.32225 16.408 3.33025 16.857 3.59025C17.306 3.85025 17.587 4.31625 18.145 5.24925L19.572 7.63025L20.922 10.0563C21.45 11.0063 21.714 11.4813 21.714 12.0003C21.714 12.5193 21.45 12.9943 20.921 13.9443L19.572 16.3703L18.146 18.7513C17.587 19.6843 17.308 20.1513 16.859 20.4113C16.409 20.6703 15.866 20.6783 14.779 20.6963L12.002 20.7403L9.22702 20.6963C8.13902 20.6783 7.59601 20.6703 7.14701 20.4103C6.69802 20.1503 6.41702 19.6843 5.85902 18.7513L4.43202 16.3703L3.08402 13.9453Z"
            stroke={data?.color}
            stroke-width="2"
          />
          <path
            id="Vector_2"
            d="M12.002 15.002C13.6588 15.002 15.002 13.6588 15.002 12.002C15.002 10.3451 13.6588 9.00195 12.002 9.00195C10.3451 9.00195 9.00195 10.3451 9.00195 12.002C9.00195 13.6588 10.3451 15.002 12.002 15.002Z"
            stroke={data?.color}
            stroke-width="2"
          />
        </g>
      </g>
    </svg>
  );
};

export const MailIconSvg = () => {
  return (
    <svg
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M43.0832 17.5865V35.2507C43.0832 37.4048 41.3207 39.1673 39.1665 39.1673H7.83317C5.679 39.1673 3.9165 37.4048 3.9165 35.2507L3.93609 11.7507C3.93609 9.59648 5.679 7.83398 7.83317 7.83398H27.6123C27.4948 8.46065 27.4165 9.12648 27.4165 9.79232C27.4165 10.4582 27.4948 11.124 27.6123 11.7507H7.83317L23.4998 21.5423L30.6869 17.0577C31.6073 17.8998 32.6844 18.5461 33.879 18.9769L23.4998 25.459L7.83317 15.6673V35.2507H39.1665V19.3882C40.6157 19.0944 41.9473 18.4481 43.0832 17.5865Z"
        fill="#72779E"
      />
      <path
        d="M37.208 15.666C33.9572 15.666 31.333 13.0418 31.333 9.79102C31.333 6.54018 33.9572 3.91602 37.208 3.91602C40.4588 3.91602 43.083 6.54018 43.083 9.79102C43.083 13.0418 40.4588 15.666 37.208 15.666Z"
        fill="#3900DB"
      />
    </svg>
  );
};

export const WhatsAppIconSvg = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Social Icons">
        <path
          id="Vector"
          d="M0 20.5L1.40583 15.3642C0.538333 13.8608 0.0825 12.1567 0.0833333 10.4092C0.0858333 4.94583 4.53167 0.5 9.99417 0.5C12.645 0.500833 15.1333 1.53333 17.005 3.40667C18.8758 5.28 19.9058 7.77 19.905 10.4183C19.9025 15.8825 15.4567 20.3283 9.99417 20.3283C8.33583 20.3275 6.70167 19.9117 5.25417 19.1217L0 20.5ZM5.4975 17.3275C6.89417 18.1567 8.2275 18.6533 9.99083 18.6542C14.5308 18.6542 18.2292 14.9592 18.2317 10.4167C18.2333 5.865 14.5525 2.175 9.9975 2.17333C5.45417 2.17333 1.75833 5.86833 1.75667 10.41C1.75583 12.2642 2.29917 13.6525 3.21167 15.105L2.37917 18.145L5.4975 17.3275ZM14.9867 12.7742C14.925 12.6708 14.76 12.6092 14.5117 12.485C14.2642 12.3608 13.0467 11.7617 12.8192 11.6792C12.5925 11.5967 12.4275 11.555 12.2617 11.8033C12.0967 12.0508 11.6217 12.6092 11.4775 12.7742C11.3333 12.9392 11.1883 12.96 10.9408 12.8358C10.6933 12.7117 9.895 12.4508 8.94917 11.6067C8.21333 10.95 7.71583 10.1392 7.57167 9.89083C7.4275 9.64333 7.55667 9.50917 7.68 9.38583C7.79167 9.275 7.9275 9.09667 8.05167 8.95167C8.1775 8.80833 8.21833 8.705 8.30167 8.53917C8.38417 8.37417 8.34333 8.22917 8.28083 8.105C8.21833 7.98167 7.72333 6.7625 7.5175 6.26667C7.31583 5.78417 7.11167 5.84917 6.96 5.84167L6.485 5.83333C6.32 5.83333 6.05167 5.895 5.825 6.14333C5.59833 6.39167 4.95833 6.99 4.95833 8.20917C4.95833 9.42833 5.84583 10.6058 5.96917 10.7708C6.09333 10.9358 7.715 13.4375 10.1992 14.51C10.79 14.765 11.2517 14.9175 11.6108 15.0317C12.2042 15.22 12.7442 15.1933 13.1708 15.13C13.6467 15.0592 14.6358 14.5308 14.8425 13.9525C15.0492 13.3733 15.0492 12.8775 14.9867 12.7742Z"
          fill="#25D366"
        />
      </g>
    </svg>
  );
};

export const InstagramIconSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <g clip-path="url(#clip0_1037_73263)">
        <path
          d="M10 2.30078C12.6719 2.30078 12.9883 2.3125 14.0391 2.35937C15.0156 2.40234 15.543 2.56641 15.8945 2.70313C16.3594 2.88281 16.6953 3.10156 17.043 3.44922C17.3945 3.80078 17.6094 4.13281 17.7891 4.59766C17.9258 4.94922 18.0898 5.48047 18.1328 6.45312C18.1797 7.50781 18.1914 7.82422 18.1914 10.4922C18.1914 13.1641 18.1797 13.4805 18.1328 14.5313C18.0898 15.5078 17.9258 16.0352 17.7891 16.3867C17.6094 16.8516 17.3906 17.1875 17.043 17.5352C16.6914 17.8867 16.3594 18.1016 15.8945 18.2813C15.543 18.418 15.0117 18.582 14.0391 18.625C12.9844 18.6719 12.668 18.6836 10 18.6836C7.32813 18.6836 7.01172 18.6719 5.96094 18.625C4.98438 18.582 4.45703 18.418 4.10547 18.2813C3.64063 18.1016 3.30469 17.8828 2.95703 17.5352C2.60547 17.1836 2.39063 16.8516 2.21094 16.3867C2.07422 16.0352 1.91016 15.5039 1.86719 14.5313C1.82031 13.4766 1.80859 13.1602 1.80859 10.4922C1.80859 7.82031 1.82031 7.50391 1.86719 6.45312C1.91016 5.47656 2.07422 4.94922 2.21094 4.59766C2.39063 4.13281 2.60938 3.79688 2.95703 3.44922C3.30859 3.09766 3.64063 2.88281 4.10547 2.70313C4.45703 2.56641 4.98828 2.40234 5.96094 2.35937C7.01172 2.3125 7.32813 2.30078 10 2.30078ZM10 0.5C7.28516 0.5 6.94531 0.511719 5.87891 0.558594C4.81641 0.605469 4.08594 0.777344 3.45313 1.02344C2.79297 1.28125 2.23438 1.62109 1.67969 2.17969C1.12109 2.73438 0.78125 3.29297 0.523438 3.94922C0.277344 4.58594 0.105469 5.3125 0.0585938 6.375C0.0117188 7.44531 0 7.78516 0 10.5C0 13.2148 0.0117188 13.5547 0.0585938 14.6211C0.105469 15.6836 0.277344 16.4141 0.523438 17.0469C0.78125 17.707 1.12109 18.2656 1.67969 18.8203C2.23438 19.375 2.79297 19.7188 3.44922 19.9727C4.08594 20.2188 4.8125 20.3906 5.875 20.4375C6.94141 20.4844 7.28125 20.4961 9.99609 20.4961C12.7109 20.4961 13.0508 20.4844 14.1172 20.4375C15.1797 20.3906 15.9102 20.2188 16.543 19.9727C17.1992 19.7188 17.7578 19.375 18.3125 18.8203C18.8672 18.2656 19.2109 17.707 19.4648 17.0508C19.7109 16.4141 19.8828 15.6875 19.9297 14.625C19.9766 13.5586 19.9883 13.2188 19.9883 10.5039C19.9883 7.78906 19.9766 7.44922 19.9297 6.38281C19.8828 5.32031 19.7109 4.58984 19.4648 3.95703C19.2188 3.29297 18.8789 2.73438 18.3203 2.17969C17.7656 1.625 17.207 1.28125 16.5508 1.02734C15.9141 0.78125 15.1875 0.609375 14.125 0.5625C13.0547 0.511719 12.7148 0.5 10 0.5Z"
          fill="#000100"
        />
        <path
          d="M10 5.36328C7.16406 5.36328 4.86328 7.66406 4.86328 10.5C4.86328 13.3359 7.16406 15.6367 10 15.6367C12.8359 15.6367 15.1367 13.3359 15.1367 10.5C15.1367 7.66406 12.8359 5.36328 10 5.36328ZM10 13.832C8.16016 13.832 6.66797 12.3398 6.66797 10.5C6.66797 8.66016 8.16016 7.16797 10 7.16797C11.8398 7.16797 13.332 8.66016 13.332 10.5C13.332 12.3398 11.8398 13.832 10 13.832Z"
          fill="#000100"
        />
        <path
          d="M16.5391 5.16016C16.5391 5.82422 16 6.35938 15.3398 6.35938C14.6758 6.35938 14.1406 5.82032 14.1406 5.16016C14.1406 4.49609 14.6797 3.96094 15.3398 3.96094C16 3.96094 16.5391 4.5 16.5391 5.16016Z"
          fill="#000100"
        />
      </g>
      <defs>
        <clipPath id="clip0_1037_73263">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FacebookIconSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <g clip-path="url(#clip0_1037_73269)">
        <path
          d="M20 10.5C20 4.9772 15.5228 0.5 10 0.5C4.4772 0.5 0 4.9772 0 10.5C0 15.1896 3.2288 19.1248 7.5844 20.2056V13.556H5.5224V10.5H7.5844V9.1832C7.5844 5.7796 9.1248 4.202 12.4664 4.202C13.1 4.202 14.1932 4.3264 14.6404 4.4504V7.2204C14.4044 7.1956 13.9944 7.1832 13.4852 7.1832C11.8456 7.1832 11.212 7.8044 11.212 9.4192V10.5H14.4784L13.9172 13.556H11.212V20.4268C16.1636 19.8288 20.0004 15.6128 20.0004 10.5H20Z"
          fill="#0866FF"
        />
        <path
          d="M13.9168 13.5561L14.478 10.5001H11.2116V9.41935C11.2116 7.80455 11.8452 7.18335 13.4848 7.18335C13.994 7.18335 14.404 7.19575 14.64 7.22055V4.45055C14.1928 4.32615 13.0996 4.20215 12.466 4.20215C9.12437 4.20215 7.58397 5.77975 7.58397 9.18335V10.5001H5.52197V13.5561H7.58397V20.2057C8.35757 20.3977 9.16677 20.5001 9.99957 20.5001C10.4096 20.5001 10.814 20.4749 11.2112 20.4269V13.5561H13.9164H13.9168Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1037_73269">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TwitterIconSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M15.2718 2.08643H18.0831L11.9413 9.106L19.1666 18.6581H13.5093L9.07828 12.8648L4.00821 18.6581H1.19528L7.76445 11.1498L0.833252 2.08643H6.63418L10.6394 7.3817L15.2718 2.08643ZM14.2852 16.9754H15.8429L5.78775 3.6807H4.11614L14.2852 16.9754Z"
        fill="black"
      />
    </svg>
  );
};

export const TiktokIconSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M14.3138 7.71964C15.5999 8.64228 17.1754 9.18515 18.8771 9.18515V5.89892C18.5551 5.89899 18.2339 5.86529 17.9188 5.7983V8.38502C16.2172 8.38502 14.6419 7.84216 13.3554 6.91958V13.6258C13.3554 16.9806 10.6455 19.7 7.30282 19.7C6.05559 19.7 4.89634 19.3216 3.93335 18.6726C5.03244 19.8004 6.56521 20.5001 8.26095 20.5001C11.6038 20.5001 14.3139 17.7807 14.3139 14.4257V7.71964H14.3138ZM15.496 4.40424C14.8387 3.6836 14.4071 2.75231 14.3138 1.72273V1.30005H13.4056C13.6342 2.60865 14.4139 3.72664 15.496 4.40424ZM6.04759 16.0983C5.68036 15.615 5.48191 15.0239 5.4828 14.4161C5.4828 12.8818 6.7223 11.6377 8.25152 11.6377C8.53651 11.6376 8.8198 11.6814 9.09139 11.7679V8.40822C8.77399 8.36457 8.45366 8.34604 8.13346 8.35283V10.9678C7.86166 10.8814 7.57824 10.8374 7.29318 10.8377C5.76396 10.8377 4.52453 12.0816 4.52453 13.6162C4.52453 14.7012 5.14408 15.6406 6.04759 16.0983Z"
        fill="#FF004F"
      />
      <path
        d="M13.3554 6.91952C14.6419 7.84209 16.2172 8.38496 17.9188 8.38496V5.79823C16.969 5.5952 16.1281 5.09708 15.4959 4.40424C14.4138 3.72657 13.6342 2.60858 13.4056 1.30005H11.0201V14.4256C11.0147 15.9558 9.77728 17.1948 8.25135 17.1948C7.35214 17.1948 6.55329 16.7646 6.04735 16.0983C5.14391 15.6406 4.52436 14.7012 4.52436 13.6163C4.52436 12.0818 5.7638 10.8378 7.29301 10.8378C7.586 10.8378 7.8684 10.8835 8.13329 10.9679V8.3529C4.84934 8.42099 2.20825 11.1138 2.20825 14.4257C2.20825 16.0789 2.86594 17.5776 3.93339 18.6727C4.89637 19.3216 6.05562 19.7001 7.30285 19.7001C10.6456 19.7001 13.3555 16.9805 13.3555 13.6258V6.91952H13.3554Z"
        fill="black"
      />
      <path
        d="M17.9188 5.79817V5.09874C17.0623 5.10004 16.2226 4.85932 15.496 4.40411C16.1392 5.11089 16.9863 5.59822 17.9188 5.79817ZM13.4056 1.29999C13.3838 1.17493 13.367 1.04904 13.3554 0.922678V0.5H10.0617V13.6257C10.0564 15.1556 8.8191 16.3946 7.29303 16.3946C6.845 16.3946 6.42199 16.2879 6.04737 16.0983C6.55331 16.7645 7.35216 17.1946 8.25137 17.1946C9.77717 17.1946 11.0148 15.9558 11.0201 14.4256V1.29999H13.4056ZM8.13345 8.35284V7.60824C7.85823 7.57049 7.58076 7.55155 7.30294 7.55169C3.95993 7.55162 1.25 10.2712 1.25 13.6257C1.25 15.7288 2.31505 17.5822 3.93347 18.6725C2.86603 17.5775 2.20834 16.0787 2.20834 14.4255C2.20834 11.1138 4.84936 8.42093 8.13345 8.35284Z"
        fill="#00F2EA"
      />
    </svg>
  );
};

export const UserIpBlockSVG = () => {
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.7499 13.625C13.3478 13.625 12.9527 13.7307 12.6044 13.9317C12.2561 14.1327 11.9668 14.4217 11.7656 14.7699C11.5644 15.1181 11.4583 15.513 11.458 15.9152C11.4578 16.3173 11.5633 16.7124 11.7641 17.0608L14.8941 13.9308C14.5462 13.73 14.1516 13.6245 13.7499 13.625ZM15.7666 14.8267L12.6599 17.9333C13.0941 18.1686 13.5928 18.2573 14.0815 18.1863C14.5702 18.1152 15.0229 17.8881 15.3722 17.5389C15.7214 17.1897 15.9484 16.737 16.0195 16.2482C16.0906 15.7595 16.0019 15.2609 15.7666 14.8267ZM10.2083 15.9167C10.2083 15.4516 10.2999 14.991 10.4778 14.5613C10.6558 14.1316 10.9167 13.7412 11.2456 13.4123C11.5745 13.0835 11.9649 12.8226 12.3946 12.6446C12.8243 12.4666 13.2848 12.375 13.7499 12.375C14.215 12.375 14.6756 12.4666 15.1053 12.6446C15.535 12.8226 15.9254 13.0835 16.2543 13.4123C16.5831 13.7412 16.844 14.1316 17.022 14.5613C17.2 14.991 17.2916 15.4516 17.2916 15.9167C17.2916 16.856 16.9184 17.7568 16.2543 18.421C15.5901 19.0852 14.6892 19.4583 13.7499 19.4583C12.8106 19.4583 11.9098 19.0852 11.2456 18.421C10.5814 17.7568 10.2083 16.856 10.2083 15.9167Z"
      fill="#72779E"
    />
    <path
      d="M13.3333 5.49984C13.3333 6.38389 12.9821 7.23174 12.3569 7.85686C11.7318 8.48198 10.884 8.83317 9.99992 8.83317C9.11586 8.83317 8.26802 8.48198 7.6429 7.85686C7.01777 7.23174 6.66659 6.38389 6.66659 5.49984C6.66659 4.61578 7.01777 3.76794 7.6429 3.14281C8.26802 2.51769 9.11586 2.1665 9.99992 2.1665C10.884 2.1665 11.7318 2.51769 12.3569 3.14281C12.9821 3.76794 13.3333 4.61578 13.3333 5.49984ZM11.9124 11.4898C11.234 11.7718 10.6295 12.2059 10.1455 12.7586C9.66155 13.3113 9.31112 13.9679 9.12129 14.6776C8.93145 15.3873 8.9073 16.1312 9.05069 16.8517C9.19408 17.5723 9.50117 18.2502 9.94825 18.8332C3.33325 18.8248 3.33325 17.149 3.33325 15.0832C3.33325 13.0123 6.31825 11.3332 9.99992 11.3332C10.6649 11.3332 11.3066 11.3882 11.9124 11.4898Z"
      fill="#72779E"
    />
  </svg>;
};