import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.main}>
      <span className={styles.stand}></span>
      <div className={styles.cat}>
        <div className={styles.body}></div>
        <div className={styles.head}>
          <div className={styles.ear}></div>
          <div className={styles.ear}></div>
        </div>
        <div className={styles.face}>
          <div className={styles.nose}></div>
          <div className={styles.whiskerContainer}>
            <div className={styles.whisker}></div>
            <div className={styles.whisker}></div>
          </div>
          <div className={styles.whiskerContainer}>
            <div className={styles.whisker}></div>
            <div className={styles.whisker}></div>
          </div>
        </div>
        <div className={styles.tailContainer}>
          <div className={styles.tail}>
            <div className={styles.tail}>
              <div className={styles.tail}>
                <div className={styles.tail}>
                  <div className={styles.tail}>
                    <div className={styles.tail}>
                      <div className={styles.tail}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
